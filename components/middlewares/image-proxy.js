
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
var pipeStream = require('stream').PassThrough;
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
	, 'ls-small': [320, 200]
	, 'ls-medium': [640, 400]
	, 'ls-large': [960, 600]
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
	var seg = this.path.split('/').filter(function (item) {
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
		ext = ext.toString();
		yield sendfile.call(this, path + '-' + input.size + '.' + ext);
	} catch(err) {
		// cache miss
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		debug('cache found');
		this.set(headers);
		return;
	}

	// STEP 5: read cache (new size) and create image
	if (ext) {
		try {
			yield createImage({
				name: input.size
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
		debug('raw cache found');
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

	debug('process started');

	// STEP 9: image processing
	try {
		// raw image
		yield saveImage({
			file: result.body
			, path: path
			, ext: ext
			, limit: config.size
		});
		yield fs.writeFile(path + '.metadata', ext);

		// process raw image
		yield createImage({
			name: input.size
			, path: path
			, ext: ext
			, limit: config.size
		});
		yield sendfile.call(this, path + '-' + input.size + '.' + ext);
	} catch(err) {
		// processing error
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		debug('image served');
		this.set(headers);
		return;
	}

	// STEP 10: catch-all
	this.status = 500;
	this.body = 'proxy not available';
};

/**
 * Read image stream, create a new image, save to file
 *
 * @param   Object   input  { name, path, ext, limit }
 * @return  Promise
 */
function createImage(input) {
	return new Promise(function (resolve, reject) {
		var raw = readStream(input.path + '.' + input.ext);

		raw.on('error', function (err) {
			reject(err);
		});

		var s1 = sharp();

		// now process image
		var size = sizes[input.name];

		// crop to square image
		if (input.name.substr(0, 2) === 'sq') {
			s1 = s1.limitInputPixels(input.limit)
				.resize(size, size)
				.quality(95)
				.progressive()
				.toFormat(input.ext);
		// resize to thumbnail image
		} else if (input.name.substr(0, 2) === 'th') {
			s1 = s1.limitInputPixels(input.limit)
				.resize(size, size)
				.max()
				.quality(95)
				.progressive()
				.toFormat(input.ext);
		// crop to exact rectangle image
		} else {
			s1 = s1.limitInputPixels(input.limit)
				.resize(size[0], size[1])
				.quality(95)
				.progressive()
				.toFormat(input.ext);
		}

		// handle sharp error
		s1.on('error', function (err) {
			reject(err);
		});

		// save processed image
		var s2 = writeStream(input.path + '-' + input.name + '.' + input.ext);

		// pipe raw image to sharp, pipe sharp output to file
		var p = raw.pipe(s1).pipe(s2);

		p.on('error', function (err) {
			reject(err);
		});

		p.on('finish', function () {
			resolve(1);
		});
	});
};

/**
 * Read image stream, save to file
 *
 * @param   Object   input  { file, path, ext, limit }
 * @return  Promise
 */
function saveImage(input) {
	return new Promise(function (resolve, reject) {
		var s1 = writeStream(input.path + '.' + input.ext);

		// limit response size
		var bytes = 0;
		var abort = false;

		// pipe raw image to file
		var p = input.file.on('data', function (chunk) {
			if (chunk === null) {
				return;
			}

			if (bytes > input.limit) {
				if (!abort) {
					abort = true;
					// clear up pipe and cache
					input.file.unpipe(s1);
					fs.unlink(input.path + '.' + input.ext);
					reject('image size over limit: ' + input.limit + ' bytes');
				}
				return;
			}

			bytes += chunk.length;
		}).pipe(s1);

		p.on('error', function (err) {
			reject(err);
		});

		p.on('finish', function () {
			resolve(1);
		});
	});
};
