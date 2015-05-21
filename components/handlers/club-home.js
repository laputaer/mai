
/**
 * club-home.js
 *
 * Koa route handler for club profile
 */

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
	if (data.club.oembed) {
		data.club.full_avatar = proxyUrl(data.club.oembed.image, config.proxy.key, 400);
	}

	data.club.level = getClubLevel(data.club.members);
	data.club.initials = getCoolInitials(data.club.title);

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
			post.embed.image = post.embed.image.map(function(image) {
				return proxyUrl(image.secure_url || image.url, config.proxy.key, 400);
			});
		}

		return post;
	});

	// STEP 6: render page
	this.state.vdoc = builder(data);
};
