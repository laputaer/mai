
/**
 * image-proxy.js
 *
 * Koa route handler for image proxy
 */

var fetch = require('node-fetch');
var sharp = require('sharp');
var cacheDomain = require('../domains/cache');
var validate = require('../security/validation');
var PassThrough = require('stream').PassThrough;

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
		, size: parseInt(this.request.query.size, 10)
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
	var pipeline = sharp();
	var body = new PassThrough();
	var file, meta;
	try {
		file = yield cacheDomain.readFile(path);
		file.pipe(pipeline);
		pipeline.pipe(body);
		meta = yield pipeline.metadata();
		this.type = meta.format;
		this.body = body;
	} catch(err) {
		// cache miss, ignore
		//this.app.emit('error', err, this);
	}

	if (this.body) {
		return;
	}

	// STEP 4: get remote image
	var res;
	try {
		res = yield fetch(input.url, {
			headers: {
				'User-Agent': this.config.request.user_agent
			}
			, follow: 2
			, timeout: 1000 * 15
		});
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (!res) {
		this.status = 504;
		this.body = 'image not available';
		return;
	}

	// STEP 5: resize image, write to cache
	var p1 = sharp().limitInputPixels(1024 * 1024 * 10).resize(input.size, input.size).quality(95);
	var p2 = sharp();
	var s1 = new PassThrough();
	var s2 = new PassThrough();
	try {
		file = yield cacheDomain.writeFile(path);
		res.body.pipe(p1);
		p1.pipe(s1);
		s1.pipe(s2);
		meta = yield p1.metadata();
		s1.pipe(file);
		this.type = meta.format;
		this.body = s2;
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (!this.body) {
		this.status = 500;
		this.body = 'image proxy error';
		return;
	}
};
