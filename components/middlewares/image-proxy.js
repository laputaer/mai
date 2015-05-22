
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

var validate = require('../security/validation');
var config;

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   Object  opts  Initial config
 * @return  MW
 */
function factory(opts) {
	// TODO: kinda a hack
	if (!config) {
		if (!opts) {
			throw Error('image proxy need to be initialized with config');
		}

		config = opts;
	}

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

	var input = {
		hash: seg.length === 2 ? seg[1] : ''
		, url: this.request.query.url || ''
		, size: this.request.query.size || ''
		, sizes: config.proxy.sizes
		, key: config.proxy.key
	};

	this.set('X-Frame-Options', 'deny');
	this.set('X-Content-Type-Options', 'nosniff');
	//this.set('Cache-Control', ['public', 'max-age=604800']);

	// STEP 3: validate input
	var result = yield validate(input, 'proxy');

	if (!result.valid) {
		this.status = 403;
		this.body = 'invalid url, hash or size';
		return;
	}

	// STEP 4: read cache first
	var path = process.cwd() + '/cache/' + input.hash + '-' + input.size;
	var ext;
	try {
		ext = yield fs.readFile(path);
		yield sendfile.call(this, path + '.' + ext);
	} catch(err) {
		// cache miss
		this.app.emit('error', err, this);
	}

	if (this.status === 200 || this.status === 304) {
		this.set('X-Cache', 'hit');
		return;
	}

	// STEP 5: read error cache
	var error_code;
	path = process.cwd() + '/cache/' + input.hash + '-error';
	try {
		error_code = yield fs.readFile(path);
		error_code = error_code.toString();
	} catch(err) {
		// error cache miss
		this.app.emit('error', err, this);
	}

	if (error_code === '500') {
		this.status = 500;
		this.body = 'content not supported';
		return;
	}

	if (error_code === '504') {
		this.status = 504;
		this.body = 'image not available';
		return;
	}

	// STEP 6: generate user agent and url for specific domain
	var ua = config.request.user_agent;
	var url = input.url;
	for (var prop in config.fake_ua) {
		if (config.fake_ua.hasOwnProperty(prop)) {
			if (input.url.indexOf(prop) > -1) {
				ua = config.fake_ua[prop];
			}
		}
	}

	for (var prop in config.fake_url) {
		if (config.fake_url.hasOwnProperty(prop)) {
			if (input.url.indexOf(prop) > -1) {
				url = url.replace(
					config.fake_url[prop].target
					, config.fake_url[prop].result
				);
			}
		}
	}

	// STEP 7: get remote image
	var res, ctype, ext;
	try {
		res = yield fetch(url, {
			headers: {
				'User-Agent': ua
			}
			, follow: config.request.follow
			, timeout: config.request.timeout
			, size: config.request.size
		});
	} catch(err) {
		// fetch error
		this.app.emit('error', err, this);
	}

	if (!res || !res.ok) {
		// cache error
		path = process.cwd() + '/cache/' + input.hash + '-error';
		yield fs.writeFile(path, '504');

		this.status = 504;
		this.body = 'image not available';
		return;
	}

	if (res.ok) {
		ctype = res.headers.get('content-type');
		ext = mime.extension(ctype);
	}

	// limit content type
	if (ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg' && ext !== 'webp') {
		// cache error
		path = process.cwd() + '/cache/' + input.hash + '-error';
		yield fs.writeFile(path, '500');

		this.status = 500;
		this.body = 'content not supported';
		return;
	}

	// STEP 8: resize image, write to cache
	var p1 = sharp();
	var size, done;
	var self = this;
	try {
		// suppress invalid format error
		p1.on('error', function(err) {
			self.app.emit('error', err, self);
		});
		// pipe stream
		res.body.pipe(p1);
		// resize image and save to cache
		size = parseInt(input.size, 10);
		path = process.cwd() + '/cache/' + input.hash + '-' + input.size;
		yield p1.limitInputPixels(1024 * 1024 * 10)
			.resize(size, size)
			.quality(95)
			.toFile(path + '.' + ext);
		yield fs.writeFile(path, ext);
		done = true;
	} catch(err) {
		// cache error
		this.app.emit('error', err, this);
	}

	if (!done) {
		// cache error
		path = process.cwd() + '/cache/' + input.hash + '-error';
		yield fs.writeFile(path, '500');

		this.status = 500;
		this.body = 'content not supported';
		return;
	}

	// STEP 9: read cache again
	try {
		yield sendfile.call(this, path + '.' + ext);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (this.status === 200 || this.status === 304) {
		this.set('X-Cache', 'miss');
		return;
	}

	// STEP 10: catch-all
	this.status = 500;
	this.body = 'proxy not available';
};
