
/**
 * image-proxy.js
 *
 * Handle image resize and proxying
 */

var fs = require('mz/fs');
var fetch = require('node-fetch');
var sharp = require('sharp');
var sendfile = require('koa-sendfile');

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
		// query approach
		//hash: seg.length === 2 ? seg[1] : ''
		//, url: this.request.query.url || ''
		//, size: this.request.query.size || ''
		// pathname approach
		hash: seg.length === 4 ? seg[1] : ''
		, url: seg.length === 4 ? decodeURIComponent(seg[2]) : ''
		, size: seg.length === 4 ? seg[3] : ''
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

	// STEP 5: generate user agent and url for specific domain
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

	// STEP 6: get remote image
	var res;
	try {
		res = yield fetch(url, {
			headers: {
				'User-Agent': ua
			}
			, follow: config.request.follow
			, timeout: config.request.timeout
		});
	} catch(err) {
		// fetch error
		// TODO: cache error response, so we don't fetch them every time
		this.app.emit('error', err, this);
	}

	if (!res || !res.ok) {
		this.status = 504;
		this.body = 'image not available';
		return;
	}

	// STEP 7: resize image, write to cache
	var p1 = sharp();
	var p2 = sharp();
	var size, done;
	var self = this;
	try {
		// suppress invalid format error
		p1.on('error', function(err) {
			self.app.emit('error', err, self);
		});
		p2.on('error', function(err) {
			self.app.emit('error', err, self);
		});
		res.body.pipe(p1);
		p1.pipe(p2);
		meta = yield p1.metadata();
		ext = meta.format;
		size = parseInt(input.size, 10);
		yield p2.limitInputPixels(1024 * 1024 * 10)
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
		this.status = 500;
		this.body = 'content not supported';
		return;
	}

	// STEP 8: read cache again
	try {
		yield sendfile.call(this, path + '.' + ext);
	} catch(err) {
		this.app.emit('error', err, this);
	}

	if (this.status === 200 || this.status === 304) {
		this.set('X-Cache', 'miss');
		return;
	}

	// STEP 9: catch-all
	this.status = 500;
	this.body = 'proxy not available';
};
