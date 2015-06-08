
/**
 * user-profile.js
 *
 * Koa route handler for full user profile
 */

var resolver = require('url').resolve;
var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var usersDomain = require('../domains/users');
var clubsDomain = require('../domains/clubs');
var getAvatarVariant = require('../helpers/get-avatar-variant');
var getUserOrigin = require('../helpers/get-user-origin');
var createError = require('../helpers/create-error-message');
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

	// STEP 2: get user profile
	data.user = yield usersDomain.matchUser({
		db: this.db
		, uid: this.params.uid
	});

	if (!data.user) {
		this.state.error_page = createError(
			404
			, data.i18n.t('error.not-found-user')
		);
		return;
	}

	// STEP 3: user data transform
	data.user.full_avatar = proxyUrl({
		url: getAvatarVariant(data.user, 400)
		, key: config.proxy.key
		, base: state.image_base_url
	});
	data.user.user_origin = getUserOrigin(data.user);
	data.canonical_url = resolver(data.current_url, data.current_path);

	// STEP 4: user post
	data.posts = yield clubsDomain.getUserPosts({
		db: this.db
		, uid: data.user.uid
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

	// STEP 5: render page
	this.state.vdoc = builder(data);
};
