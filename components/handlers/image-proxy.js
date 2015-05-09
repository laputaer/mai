
/**
 * image-proxy.js
 *
 * Koa route handler for image proxy
 */

var PassThrough = require('stream').PassThrough;
var fetch = require('node-fetch');
var sharp = require('sharp');
var cacheDomain = require('../domains/cache');
var validate = require('../security/validation');

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
	yield next;

	// STEP 1: prepare common data
	var input = {
		hash: this.params.hash
		, url: this.request.query.url
		, size: this.request.query.size
		, sizes: this.config.proxy.sizes
		, key: this.config.proxy.key
	};

	// STEP 2: validate input
	var result = yield validate(input, 'proxy');

	if (!result.valid) {
		this.status = 403;
		this.body = 'invalid url, hash or size';
		return;
	}

	// STEP 3: read cache
	var path = process.cwd() + '/cache/' + input.hash + '-' + input.size;
	var file, s1, s2, meta;
	try {
		file = yield cacheDomain.readFile(path);
		this.body = file;
	} catch(err) {
		// cache miss, ignore
	}

	if (file) {
		return;
	}

	// STEP 4: get remote image
	var res, type;
	try {
		res = yield fetch(input.url, {
			headers: {
				'User-Agent': this.config.request.user_agent
			}
			, follow: 2
			, timeout: 1000 * 30
			, size: 1000 * 1000 * 10
		});
		type = res.headers.get('content-type');
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (!res) {
		this.status = 504;
		this.body = 'image not available';
		return;
	}

	// STEP 5: write to cache
	try {
		file = yield cacheDomain.writeFile(path);
		res.body.pipe(file);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	// STEP 6: serve image
	this.body = res.body;
};
