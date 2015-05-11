
/**
 * get-image-profile.js
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
	if (url.hostname.indexOf('flickr.com') || url.hostname.indexOf('flic.kr')) {
		profile = yield getFlickrImageProfile(opts);
	}

	return profile;
};
