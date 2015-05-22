
/**
 * get-image-profile.js (deprecated)
 *
 * Retrieve oembed image profile
 */

var parser = require('url').parse;
var getFlickrImageProfile = require('./flickr-image-profile');

module.exports = getImageProfile;

/**
 * Get oembed data
 *
 * @param   Object  opts  Options { url, user_agent, follow, timeout }
 * @return  Object        Standard image profile
 */
function *getImageProfile(opts) {
	var url = parser(opts.url);

	var profile;
	if (url.hostname.indexOf('flickr.com') >= 0 || url.hostname.indexOf('flic.kr') >= 0) {
		profile = yield getFlickrImageProfile(opts);
	}

	return profile;
};
