
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
var debug = require('debug')('mai:proxy');

var matchUrl = require('../helpers/match-url-pattern');
var validate = require('../security/validation');

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
		this.body = 'invalid hash';
		return;
	}

	// STEP 3: validate input
	var config = this.config;
	var input = {
		hash: seg[1] || ''
		, url: this.request.query.url || ''
		, size: this.request.query.size || ''
		, sizes: config.proxy.sizes
		, key: config.proxy.key
	};

	var result = yield validate(input, 'proxy');

	if (!result.valid) {
		this.status = 403;
		if (result.errors.size.length > 0) {
			this.body = 'invalid size';
		} else if (result.errors.url.length > 0) {
			this.body = 'invalid url';
		} else {
			this.body = 'unknown error';
		}
		return;
	}

	// STEP 4: read cache first
	var path = process.cwd() + '/cache/' + input.hash + '-' + input.size;
	var ext;
	try {
		// load extension name and serve the actual image
		ext = yield fs.readFile(path);
		yield sendfile.call(this, path + '.' + ext);
	} catch(err) {
		// cache miss
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		this.set('Cache-Control', ['public', 'max-age=604800']);
		this.set('X-Mai-Cache', 'hit');
		this.set('X-Frame-Options', 'deny');
		this.set('X-Content-Type-Options', 'nosniff');
		return;
	}

	// STEP 5: generate user_agent, url, referer for specific domain
	var ua = config.request.user_agent;
	var url = input.url;
	var referer;
	var parsed_url = parser(url);
	var host = parsed_url.hostname;

	result = matchUrl(host, config.fake_ua)
	if (result) {
		ua = result;
	}

	result = matchUrl(host, config.fake_url)
	if (result) {
		url = url.replace(result.target, result.replaced);
	}

	result = matchUrl(host, config.fake_referer)
	if (result) {
		referer = result;
	}

	debug('request started');

	// STEP 6: start loading remote image
	try {
		result = yield fetch(url, {
			headers: {
				'User-Agent': ua
				, 'Referer': referer
			}
			, follow: config.request.follow
			, timeout: config.request.timeout
			, size: config.request.size
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

	// STEP 7: limit image type to common format
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

	// STEP 8: resize image and write to cache
	var size = parseInt(input.size, 10);
	var s1 = sharp();
	try {
		s1.on('error', function(err) {
			debug(err);
		});
		result.body.pipe(s1);
		yield s1.limitInputPixels(config.request.size)
			.resize(size, size)
			.quality(95)
			.toFormat(ext)
			.toFile(path + '.' + ext);
		yield fs.writeFile(path, ext);
	} catch(err) {
		// cache error
		debug(err);
	}

	// STEP 9: read cache again
	try {
		yield sendfile.call(this, path + '.' + ext);
	} catch(err) {
		// cache miss
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		this.set('Cache-Control', ['public', 'max-age=604800']);
		this.set('X-Mai-Cache', 'miss');
		this.set('X-Frame-Options', 'deny');
		this.set('X-Content-Type-Options', 'nosniff');
		return;
	}

	// STEP 10: catch-all
	this.status = 500;
	this.body = 'proxy not available';
};
