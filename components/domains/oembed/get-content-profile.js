
/**
 * get-content-profile.js
 *
 * Retrieve oembed content profile
 */

var parser = require('url').parse;
var getTwitterContentProfile = require('./twitter-content-profile');

module.exports = getContentProfile;

/**
 * Get oembed data
 *
 * @param   Object  opts  Options { url, user_agent, follow, timeout }
 * @return  Object        Standard image profile
 */
function *getContentProfile(opts) {
	var url = parser(opts.url);

	var profile;
	if (url.hostname.indexOf('twitter.com') >= 0) {
		profile = yield getTwitterContentProfile(opts);
	}

	return profile;
};
