
/**
 * get-user-profile.js
 *
 * Retrieve oauth user profile
 */

var Purest = require('purest');

module.exports = getUserProfile;

/**
 * Get user profile
 *
 * @return  Object
 */
function *getUserProfile() {
	var ua = this.config.request.user_agent;
	var config = this.config.oauth;

	var opts = {};
	opts.provider = this.params.provider;
	opts.access_token = this.request.query.access_token || null;
	opts.key = config[opts.provider]['type'] === 1 ? config[opts.provider]['key'] : null;
	opts.secret = config[opts.provider]['type'] === 1 ? config[opts.provider]['secret'] : null;
	opts.defaults = {
		headers: {
			'User-Agent': ua
		}
	};

	var client = new Purest(opts);
	var profile;

	try {
		if (opts.provider === 'github') {
			profile = yield getGithubUser(client, opts);
		} else if (opts.provider === 'twitter') {
			profile = yield getTwitterUser(client, opts);
		}
		profile.provider = opts.provider;
		profile.uid = opts.provider + '_' + profile.id;
	} catch(err) {
		this.app.emit('error', err, this);
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
					console.log(body);
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
			.auth(opts.access_token)
			.request(function(err, res, body) {
				if (err || (res.statusCode < 200 || res.statusCode >= 300)) {
					console.log(body);
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
