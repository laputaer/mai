
/**
 * get-user-profile.js
 *
 * Retrieve oauth user profile
 */

var Purest = require('purest');
var validator = require('validator');
var xss = require('xss');

module.exports = getUserProfile;

/**
 * Get user profile
 *
 * @return  Object
 */
function *getUserProfile() {
	// load oauth related config
	var config = this.config.oauth;

	// load oauth result
	var opts = {};
	opts.provider = this.params.provider;

	// invalid provider
	if (!config[opts.provider]) {
		return;
	}

	// missing grant response
	if (!this.session.grant.response) {
		return;
	}

	// token for api calls
	opts.access_token = this.session.grant.response.access_token || null;
	opts.access_secret = this.session.grant.response.access_secret || null; // oauth 1
	opts.refresh_token = this.session.grant.response.refresh_token || null; // oauth 2
	// only for oauth 1
	opts.key = config[opts.provider]['type'] === 1 ? config[opts.provider]['key'] : null;
	opts.secret = config[opts.provider]['type'] === 1 ? config[opts.provider]['secret'] : null;
	// identify consumer UA (a requirement for some oauth providers)
	opts.defaults = {
		headers: {
			'User-Agent': this.config.request.user_agent
		}
	};

	// reset grant session
	this.session.grant = {};

	// missing token, abort
	if (!opts.access_token) {
		return;
	}

	// setup client
	var client = new Purest(opts);
	var profile;

	// send request, handle error
	try {
		if (opts.provider === 'github') {
			profile = yield getGithubUser(client, opts);
		} else if (opts.provider === 'twitter') {
			profile = yield getTwitterUser(client, opts);
		}
		profile.provider = opts.provider;
		profile.uid = opts.provider + '_' + profile.id;
	} catch(err) {
		profile = false;
		this.app.emit('error', err, this);
	}

	// no profile found, abort
	if (!profile) {
		return;
	}

	// filter and validate risky inputs
	profile.name = xss(profile.name);
	if (!validator.isLength(profile.name, 1, 60)) {
		profile.name = profile.name.substr(0, 60) || 'No Name';
	}

	profile.avatar = xss(profile.avatar);
	if (!validator.isURL(profile.avatar)) {
		delete profile.avatar;
	}

	return profile;
};

/**
 * Get Github user profile
 *
 * @param   Object   client  RESTful client
 * @param   Object   opts    Addtional options
 * @return  Promise
 */
function getGithubUser(client, opts) {
	return new Promise(function(resolve, reject) {
		client.query()
			.get('user')
			.auth(opts.access_token)
			.request(function(err, res, body) {
				if (err || (res.statusCode < 200 || res.statusCode >= 300)) {
					reject(new Error('remote server returns status code ' + res.statusCode));
					return;
				}

				resolve({
					id: body.id.toString()
					, name: body.name
					, login: body.login
					, avatar: body.avatar_url
				});
			});
	});
};

/**
 * Get Twitter user profile
 *
 * @param   Object   client  RESTful client
 * @param   Object   opts    Addtional options
 * @return  Promise
 */
function getTwitterUser(client, opts) {
	return new Promise(function(resolve, reject) {
		client.query()
			.get('account/verify_credentials')
			.auth(opts.access_token, opts.access_secret)
			.request(function(err, res, body) {
				if (err || (res.statusCode < 200 || res.statusCode >= 300)) {
					reject(new Error('remote server returns status code ' + res.statusCode));
					return;
				}

				resolve({
					id: body.id_str
					, name: body.name
					, login: body.screen_name
					, avatar: body.profile_image_url_https
				});
			});
	});
};
