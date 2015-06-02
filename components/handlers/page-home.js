
/**
 * page-home.js
 *
 * Koa route handler for index page
 */

var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');

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
	var data = prepareData(this);
	var config = this.config;
	var state = this.state;

	// STEP 2: get latest posts
	data.posts = yield clubsDomain.getPosts({
		db: this.db
	});

	data.posts = data.posts.map(function(post) {
		if (post.embed.image && post.embed.image.length > 0) {
			post.embed.image = post.embed.image.map(function(image) {
				return proxyUrl({
					url: image.secure_url || image.url
					, key: config.proxy.key
					, base: state.image_base_url
				});
			}).slice(0, 4);
		}

		if (post.embed.url) {
			url = parser(post.embed.url);
			post.embed.site_url = url.protocol + '//' + url.hostname + '/';
		}

		return post;
	});

	// STEP 3: render page
	this.state.vdoc = builder(data);
};
