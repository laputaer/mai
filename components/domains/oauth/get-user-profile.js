
/**
 * get-user-profile.js
 *
 * Retrieve oauth user profile
 */

var Purest = require('purest');

var getGithubUserProfile = require('./github-user-profile');
var getTwitterUserProfile = require('./twitter-user-profile');
var getWeiboUserProfile = require('./weibo-user-profile');

module.exports = getUserProfile;

/**
 * Get user profile
 *
 * @param   Object  opts  Options { provider, config, response }
 * @return  Object        User oauth profile
 */
function *getUserProfile(opts) {
	// missing oauth reponse or token
	if (!opts.response || !opts.response.access_token) {
		throw new Error('missing oauth response or access token');
	}

	var provider = opts.provider;
	var oauth = opts.config.oauth;
	var options = {
		provider: provider
		, access_token: opts.response.access_token
		, refresh_token: opts.response.refresh_token // oauth 2
		, access_secret: opts.response.access_secret // oauth 1
		, key: oauth[provider].type === 1 ? oauth[provider].key : undefined // oauth 1
		, secret: oauth[provider].type === 1 ? oauth[provider].secret : undefined // oauth 1
		, defaults: {
			headers: {
				'User-Agent': opts.config.request.user_agent // always identify consumer UA
			}
		}
	};

	// setup client
	var client = new Purest(options);
	var profile;

	// send request, may throw error
	if (provider === 'github') {
		profile = yield getGithubUserProfile(client, options);
	} else if (provider === 'twitter') {
		profile = yield getTwitterUserProfile(client, options);
	} else if (provider === 'weibo') {
		profile = yield getWeiboUserProfile(client, options);
	}

	// empty user profile
	if (!profile || !profile.id) {
		throw new Error('oauth profile empty');
	}

	// user data for subsequent requests
	profile.provider = provider;
	profile.uid = provider + '_' + profile.id;
	profile.access_token = options.access_token;
	profile.access_secret = options.access_secret || '';

	return profile;
};
