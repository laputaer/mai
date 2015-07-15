
/**
 * image-proxy.js
 *
 * Handle image resize and proxying
 */

var fs = require('mz/fs');
var fetch = require('node-fetch');
var sharp = require('sharp');
var sendfile = require('koa-sendfile');
var mime = require('mime-types');
var parser = require('url').parse;
var readStream = require('fs').createReadStream;
var writeStream = require('fs').createWriteStream;
var debug = require('debug')('mai:proxy');

var matchUrl = require('../helpers/match-url-pattern');
var validate = require('../security/validation');

var sizes = {
	'sq-tiny': 40
	, 'sq-small': 80
	, 'sq-medium': 100
	, 'sq-large': 200
	, 'sq-grand': 400
	, 'th-tiny': 100
	, 'th-small': 200
	, 'th-medium': 400
	, 'th-large': 800
	, 'th-grand': 1600
	, 'club-list-small': [320, 80]
	, 'club-list-medium': [640, 160]
	, 'club-list-large': [960, 240]
};
var headers = {
	'Cache-Control': ['public', 'max-age=604800']
	, 'X-Mai-Cache': 'hit'
	, 'X-Frame-Options': 'deny'
	, 'X-Content-Type-Options': 'nosniff'
};
var extensions = ['jpeg', 'png', 'webp', 'gif'];

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory() {
	return middleware;
};

/**
 * Koa middleware
 *
 * @param   Function  next  Flow control
 * @return  Void
 */
function *middleware(next) {
	// STEP 1: route matching
	if (this.path.substr(0, 4) !== '/ip/') {
		yield next;
		return;
	}

	// STEP 2: prepare common data
	var seg = this.path.split('/').filter(function(item) {
		return item !== '';
	});

	if (seg.length !== 2) {
		this.status = 403;
		this.body = 'invalid input';
		return;
	}

	// STEP 3: validate input
	var config = this.config.proxy;
	var input = {
		hash: seg[1] || ''
		, url: this.request.query.url
		, size: this.request.query.size
		, sizes: sizes
		, key: config.key
	};

	var result = yield validate(input, 'proxy');

	if (!result.valid) {
		this.status = 403;
		if (result.errors.size.length > 0) {
			this.body = 'invalid size';
		} else if (result.errors.url.length > 0) {
			this.body = 'invalid url or hash';
		} else {
			this.body = 'unknown error';
		}
		return;
	}

	// STEP 4: read cache (existing size) and return
	var path = process.cwd() + '/cache/' + input.hash;
	var ext;
	try {
		// load extension name and serve the actual image
		ext = yield fs.readFile(path + '.metadata');
		yield sendfile.call(this, path + '-' + input.size + '.' + ext);
	} catch(err) {
		// cache miss
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		this.set(headers);
		return;
	}

	// STEP 5: read cache (new size) and create image
	if (ext) {
		var file = readStream(path + '.' + ext);
		try {
			createImage({
				file: file
				, name: input.size
				, path: path
				, ext: ext
				, limit: config.size
			});
			yield sendfile.call(this, path + '-' + input.size + '.' + ext);
		} catch(err) {
			// raw cache miss
			debug(err);
		}
	}

	if (this.status === 200 || this.status === 304) {
		this.set(headers);
		return;
	}

	// STEP 6: no cache found, prepare request
	var ua = config.user_agent;
	var url = input.url;
	var parsed_url = parser(url);
	var referer;

	result = matchUrl(parsed_url.hostname, config.replace.ua)
	if (result) {
		ua = result;
	}

	result = matchUrl(parsed_url.hostname, config.replace.url)
	if (result) {
		url = url.replace(result.target, result.replaced);
	}

	result = matchUrl(parsed_url.hostname, config.replace.referer)
	if (result) {
		referer = input.url;
	}

	debug('request started');

	// STEP 7: start loading remote image
	try {
		result = yield fetch(url, {
			headers: {
				'User-Agent': ua
				, 'Referer': referer
			}
			, follow: config.follow
			, timeout: config.timeout
			, size: config.size
		});
	} catch(err) {
		// fetch error
		debug(err);
	}

	debug('response started');

	if (!result || !result.ok) {
		this.status = 500;
		this.body = 'image not available';
		return;
	}

	// STEP 8: limit image type to common format
	var ctype = result.headers.get('content-type');
	ext = mime.extension(ctype);

	if (extensions.indexOf(ext) === -1) {
		this.status = 500;
		this.body = 'image not supported';
		return;
	}

	// gif output is not supported, normalized to jpeg
	if (ext === 'gif') {
		ext = 'jpeg';
	}

	// STEP 9: save raw image
	var raw = writeStream(path + '.' + ext);
	raw.on('error', function(err) {
		debug(err);
	});
	result.body.pipe(raw);

	// STEP 10: create new image, serve new image
	try {
		createImage({
			file: result.body
			, name: input.size
			, path: path
			, ext: ext
			, limit: config.size
		});
		yield sendfile.call(this, path + '-' + input.size + '.' + ext);
	} catch(err) {
		// process error
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		this.set(headers);
		return;
	}

	// STEP 11: catch-all
	this.status = 500;
	this.body = 'proxy not available';
};

/**
 * Read image stream, create a new image, save to file
 *
 * @param   Object  input  { file, name, path, ext, limit }
 * @return  Void
 */
function createImage(input) {
	var s1 = sharp();

	// handle unexpected errors
	s1.on('error', function(err) {
		debug(err);
	});

	// pipe stream to sharp
	input.file.pipe(s1);

	// now process image
	var size = sizes[input.name];

	// crop to square image
	if (input.name.substr(0, 2) === 'sq') {
		yield s1.limitInputPixels(input.limit)
			.resize(size, size)
			.quality(95)
			.toFormat(input.ext)
			.toFile(input.path + '-' + input.name + '.' + input.ext);
	// resize to thumbnail image
	} else if (input.name.substr(0, 2) === 'th') {
		yield s1.limitInputPixels(input.limit)
			.resize(size, size)
			.max()
			.quality(95)
			.toFormat(input.ext)
			.toFile(input.path + '-' + input.name + '.' + input.ext);
	// crop to exact rectangle image
	} else {
		yield s1.limitInputPixels(input.limit)
			.resize(size[0], size[1])
			.quality(95)
			.toFormat(input.ext)
			.toFile(input.path + '-' + input.name + '.' + input.ext);
	}
};
