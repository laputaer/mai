
/**
 * club-home.js
 *
 * Koa route handler for club profile
 */

var resolver = require('url').resolve;
var parser = require('url').parse;

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
var createError = require('../helpers/create-error-message');
var getCoolInitials = require('../helpers/get-cool-initials');
var getClubLevel = require('../helpers/get-club-level');
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

	// STEP 2: find club
	data.club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (!data.club) {
		this.state.error_page = createError(
			404
			, data.i18n.t('error.not-found-club')
		);
		return;
	}

	// STEP 3: club data transform
	var url;
	if (data.club.embed && data.club.embed.image && data.club.embed.image.length > 0) {
		data.club.full_avatar = proxyUrl({
			url: data.club.embed.image[0].url
			, key: config.proxy.key
			, base: state.image_base_url
		});
		data.club.avatar_source = data.club.embed.url;
		url = parser(data.club.embed.url);
		data.club.avatar_domain = url.hostname;
	}

	data.club.level = getClubLevel(data.club.members);
	data.club.initials = getCoolInitials(data.club.title);
	data.canonical_url = resolver(data.current_url, data.current_path);

	// STEP 4: find club owner
	data.owner = yield usersDomain.matchUser({
		db: this.db
		, uid: data.club.owner
	});

	// STEP 5: find user and membership if login
	if (data.current_user) {
		data.user = yield usersDomain.matchUser({
			db: this.db
			, uid: data.current_user.uid
		});

		data.membership = yield clubsDomain.matchMembership({
			db: this.db
			, uid: data.current_user.uid
			, slug: data.club.slug
		});
	}

	// STEP 6: find posts
	data.posts = yield clubsDomain.getClubPosts({
		db: this.db
		, slug: data.club.slug
	});

	data.posts = data.posts.map(function(post) {
		if (post.embed.image && post.embed.image.length > 0) {
			post.embed.image = post.embed.image.slice(0, 4).map(function(image) {
				return proxyUrl({
					url: image.secure_url || image.url
					, key: config.proxy.key
					, base: state.image_base_url
				});
			});
		}

		if (post.embed.url) {
			url = parser(post.embed.url);
			post.embed.domain = url.hostname;
		}

		return post;
	});

	// STEP 6: render page
	this.state.vdoc = builder(data);
};
