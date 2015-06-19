
/**
 * api-latest-posts.js
 *
 * Koa route handler for index page
 */

var parser = require('url').parse;

var clubsDomain = require('../domains/clubs');
var proxyUrl = require('../security/proxy');
var getStandardJson = require('../helpers/get-standard-json');
var normalize = require('../security/normalization');

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
	var config = this.config;
	var state = this.state;

	// STEP 2: get latest posts
	var posts = yield clubsDomain.getPosts({
		db: this.db
		, skip: 0
		, limit: 50
	});

	posts = posts.map(function(post) {
		if (post.embed.image && post.embed.image.length > 0) {
			post.embed.image = post.embed.image[0];
			post.embed.image.url = proxyUrl({
				url: post.embed.image.secure_url || post.embed.image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		if (post.embed.url) {
			var url = parser(post.embed.url);
			post.embed.domain = url.hostname;
		}

		return normalize(post, 'outputPost');
	});

	// STEP 3: output json
	this.state.json = getStandardJson(posts);
};
