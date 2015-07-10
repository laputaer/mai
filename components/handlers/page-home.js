
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
	/*
	data.posts = yield clubsDomain.getPosts({
		db: this.db
	});

	data.posts = data.posts.map(function(post) {
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

		return post;
	});
	*/

	data.featured_clubs = yield clubsDomain.getFeaturedClubs({
		db: this.db
		, slugs: ['frontend-talk', 'marisa', 'eventer']
	});

	console.log(data);

	// STEP 3: render page
	//this.state.vdoc = builder(data);
};
