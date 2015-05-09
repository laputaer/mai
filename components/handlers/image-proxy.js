
/**
 * image-proxy.js
 *
 * Koa route handler for image proxy
 */

var fetch = require('node-fetch');
var sharp = require('sharp');
var mime = require('mime-types')
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
		, key: this.config.proxy.key
	};

	// STEP 2: validate input
	var result = yield validate(input, 'proxy');

	if (!result.valid) {
		this.status = 403;
		this.body = 'Invalid url or hash';
		return;
	}

	// STEP 3: get image file
	var res = yield fetch(input.url, {
		headers: {
			'User-Agent': this.config.request.user_agent
		}
		, follow: 2
		, timeout: 1000 * 30
		, size: 1000 * 1000 * 10
	});
	this.type = 'jpg';
	this.body = res.body;

	// STEP 4: process and return image
	//this.body = yield sharp(res.body).toBuffer();
};
