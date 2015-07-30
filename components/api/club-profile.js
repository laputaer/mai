
/**
 * club-profile.js
 *
 * API for getting club profile and related information
 */

var resolver = require('url').resolve;
var parser = require('url').parse;

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var clubsDomain = require('../domains/clubs');
var usersDomain = require('../domains/users');
var getCoolInitials = require('../helpers/get-cool-initials');
var getClubLevel = require('../helpers/get-club-level');
var proxyUrl = require('../security/proxy');
var i18n = require('../templates/i18n')();

var filter_output = [
	'slug', 'title', 'intro', 'points', 'members'
	, 'initials', 'level', 'image', 'domain', 'url', 'current_user_member'
	, 'owner', 'owner_name', 'owner_login', 'owner_avatar'
];

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
	// optional flow control, so this can be used as component
	if (next) {
		yield next;
	}

	// STEP 1: prepare common data
	var config = this.config;
	var state = this.state;
	var uid = this.session.uid;

	// STEP 2: find club
	var club_profile = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (next && !club_profile) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-club'));
		return;
	}

	// STEP 3: find club owner
	var club_owner = yield usersDomain.matchUser({
		db: this.db
		, uid: club_profile.owner
	});

	// STEP 4: find club membership
	var club_membership;
	if (uid) {
		club_membership = yield clubsDomain.matchMembership({
			db: this.db
			, uid: uid
			, slug: club_profile.slug
		});
	}

	// STEP 5: club data transform
	if (club_profile.embed) {
		if (Array.isArray(club_profile.embed.image) && club_profile.embed.image.length > 0) {
			var image = club_profile.embed.image[0];
			club_profile.image = proxyUrl({
				url: image.secure_url || image.url
				, key: config.proxy.key
				, base: state.image_base_url
			});
		}

		if (club_profile.embed.url) {
			var url = parser(club_profile.embed.url);
			club_profile.url = club_profile.embed.url;
			club_profile.domain = url.hostname;
		}
	}

	if (club_profile.title) {
		club_profile.initials = getCoolInitials(club_profile.title);
	}

	if (club_profile.members >= 0) {
		club_profile.level = getClubLevel(club_profile.members);
	}

	if (club_membership) {
		club_profile.current_user_member = true;
	}

	if (club_owner) {
		club_profile.owner_name = club_owner.name;
		club_profile.owner_login = club_owner.login;
		club_profile.owner_avatar = proxyUrl({
			url: club_owner.avatar
			, key: config.proxy.key
			, base: state.image_base_url
		});
	}

	club_profile = filterAttributes(club_profile, filter_output);

	if (!next) {
		return club_profile;
	}

	// STEP 6: output json
	this.state.json = getStandardJson(club_profile);
};
