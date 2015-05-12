
/**
 * club-update.js
 *
 * Koa route handler for club profile update
 */

var clubsDomain = require('../domains/clubs');
var sessionDomain = require('../domains/session');
var oembedDomain = require('../domains/oembed');
var formError = require('../helpers/create-form-message');
var validate = require('../security/validation');

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
	var slug = this.params.slug;
	var user = this.state.user;
	var config = this.config;

	// STEP 2: user should be login
	if (!user) {
		this.redirect('/');
		return;
	}

	// STEP 3: find existing club, check owner
	var club = yield clubsDomain.matchClub({
		db: this.db
		, slug: slug
	});

	if (!club) {
		this.redirect('/');
		return;
	}

	if (club.owner !== user.uid) {
		this.redirect('/c/' + slug);
		return;
	}

	// STEP 4: csrf validation
	var body = this.request.body;
	var result = yield sessionDomain.verifyCsrfToken({
		session: this.session
		, cache: this.cache
		, token: body.csrf_token
	});

	if (!result) {
		this.flash = formError(
			this.i18n.t('error.invalid-csrf-token')
			, body
		);
		this.redirect('/c/' + slug + '/edit');
		return;
	}

	// STEP 5: input validation
	result = yield validate(body, 'club');

	if (!result.valid) {
		this.flash = formError(
			this.i18n.t('error.form-input-invalid')
			, body
			, result.errors
		);
		this.redirect('/c/' + slug + '/edit');
		return;
	}

	// STEP 6: find oembed data, if logo changes
	var oembed;
	if (body.logo && body.logo !== club.logo) {
		try {
			oembed = yield oembedDomain.getImageProfile({
				url: body.logo
				, user_agent: config.request.user_agent
				, follow: config.request.follow
				, timeout: config.request.timeout
			});
		} catch(err) {
			// TODO: many type of oembed error, we better distinguish them
			this.app.emit('error', err, this);
		}

		if (!oembed) {
			this.flash = formError(
				this.i18n.t('error.oembed-error-response')
				, body
				, ['logo']
			);
			this.redirect('/c/' + slug + '/edit');
			return;
		}

		result = yield validate(oembed, 'oembedImage');

		if (!result.valid) {
			this.flash = formError(
				this.i18n.t('error.oembed-invalid-profile')
				, body
				, ['logo']
			);
			this.redirect('/c/' + slug + '/edit');
			return;
		}
	}

	// STEP 7: find existing club, if slug changes
	var exist;
	if (body.slug !== slug) {
		exist = yield clubsDomain.matchClub({
			db: this.db
			, slug: body.slug
		});
	}

	if (exist) {
		this.flash = formError(
			this.i18n.t('error.club-already-exist')
			, body
			, ['slug']
		);
		this.redirect('/c/' + slug + '/edit');
		return;
	}

	// STEP 8: update club
	club = yield clubsDomain.updateClub({
		db: this.db
		, data: body
		, slug: slug
		, oembed: oembed
	});

	this.redirect('/c/' + club.slug);
};
