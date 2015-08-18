
/**
 * manage-club.js
 *
 * API for updating club
 */

var getStandardJson = require('../helpers/get-standard-json');
var filterAttributes = require('../helpers/filter-attributes');
var i18n = require('../templates/i18n')();

var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var embedDomain = require('../domains/embed');

var validate = require('../security/validation');
var normalize = require('../security/normalization');

var filter_output = [
	'slug', 'title'
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
	yield next;

	var config = this.config;

	// STEP 1: handle guest user
	if (!this.state.user) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.login-required'));
		return;
	}

	// STEP 2: csrf validation
	var body = this.request.body;
	var result = yield sessionDomain.verifyCsrfToken({
		session: this.session
		, cache: this.cache
		, token: body.csrf_token
	});

	if (!result) {
		this.state.error_json = getStandardJson(null, 403, i18n.t('error.invalid-csrf-token'));
		return;
	}

	// STEP 3: input validation
	result = yield validate(body, 'club');

	if (!result.valid) {
		this.state.error_json = getStandardJson(result, 400, i18n.t('error.form-input-invalid'));
		return;
	}

	// STEP 4: find existing club
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: this.params.slug
	});

	if (!club) {
		this.state.error_json = getStandardJson(null, 404, i18n.t('error.not-found-club'));
		return;
	}

	if (club.owner !== this.session.uid) {
		this.state.error_json = getStandardJson(null, 400, i18n.t('error.access-control'));
		return;
	}

	// STEP 5: reload embed data, if logo url changes
	var embed;
	if (body.logo && body.logo !== club.logo) {
		try {
			embed = yield embedDomain.getOpenGraphProfile({
				url: body.logo
				, user_agent: config.request.user_agent
				, follow: config.request.follow
				, timeout: config.request.timeout
				, size: config.request.size
			});
		} catch(err) {
			this.app.emit('error', err, this);
		}

		if (!embed) {
			this.state.error_json = getStandardJson({ logo: true }, 400, i18n.t('error.opengraph-error-response'));
			return;
		}

		embed = normalize(embed, 'opengraph');
		result = yield validate(embed, 'opengraph');

		if (!result.valid) {
			this.state.error_json = getStandardJson({ logo: true }, 400, i18n.t('error.opengraph-invalid-profile'));
			return;
		}
	}

	// STEP 6: check for existing club, if slug name changes
	var exist;
	if (body.slug !== club.slug) {
		exist = yield clubsDomain.matchClub({
			db: this.db
			, slug: body.slug
		});
	}

	if (exist) {
		this.state.error_json = getStandardJson({ slug: true }, 409, i18n.t('error.club-already-exist'));
		return;
	}

	// STEP 7: update club
	club = yield clubsDomain.updateClub({
		db: this.db
		, data: body
		, slug: club.slug
		, embed: embed
	});

	// STEP 8: output json
	this.state.json = getStandardJson(filterAttributes(club, filter_output));
};
