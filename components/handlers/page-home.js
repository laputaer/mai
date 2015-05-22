
/**
 * page-home.js
 *
 * Koa route handler for index page
 */

var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');

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

	// STEP 2: get latest posts
	data.posts = yield clubsDomain.getPosts({
		db: this.db
	});

	data.posts = data.posts.map(function(post) {
		if (post.embed.url) {
			url = parser(post.embed.url);
			post.embed.site_url = url.protocol + '//' + url.hostname + '/';
		}

		return post;
	});

	// STEP 3: render page
	this.state.vdoc = builder(data);
};
