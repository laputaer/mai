
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

// TODO: support gif, need stream support from libvips 8+ or buffer image data
var extensions = ['jpg', 'jpeg', 'png', 'webp'];

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory(opts) {
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
		this.set('X-Cache', 'hit');
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

	if (result = matchUrl(host, config.fake_ua)) {
		ua = result;
	}

	if (result = matchUrl(host, config.fake_url)) {
		url = url.replace(result.target, result.replaced);
	}

	if (result = matchUrl(host, config.fake_referer)) {
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

	// STEP 7: buffer image when supported
	var ctype = result.headers.get('content-type');
	ext = mime.extension(ctype);

	if (extensions.indexOf(ext) === -1) {
		this.status = 500;
		this.body = 'image not supported';
		return;
	}

	var image;
	try {
		image = yield new Promise(function(resolve, reject) {
			var rejected = false;
			var length = 0;
			var raw = [];

			result.body.on('error', function(err) {
				reject(err);
			});

			result.body.on('data', function(chunk) {
				if (chunk === null || rejected) {
					return;
				}

				length += chunk.length;

				if (length > config.request.size) {
					rejected = true;
					reject(new Error('image too large'));
					return;
				}

				raw.push(chunk);
			});

			result.body.on('end', function() {
				if (rejected) {
					return;
				}

				resolve(Buffer.concat(raw));
			});
		});
	} catch(err) {
		// buffer error
		debug(err);
	}

	if (!image) {
		this.status = 500;
		this.body = 'image not valid';
		return;
	}

	debug('image loaded');

	// STEP 8: resize image and write to cache
	var size = parseInt(input.size, 10);
	try {
		yield sharp(image)
			.limitInputPixels(config.request.size)
			.resize(size, size)
			.quality(95)
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
		// unexpected error
		debug(err);
	}

	if (this.status === 200 || this.status === 304) {
		this.set('Cache-Control', ['public', 'max-age=604800']);
		this.set('X-Cache', 'hit');
		this.set('X-Frame-Options', 'deny');
		this.set('X-Content-Type-Options', 'nosniff');
		return;
	}

	// STEP 10: catch-all
	this.status = 500;
	this.body = 'proxy not available';
};
