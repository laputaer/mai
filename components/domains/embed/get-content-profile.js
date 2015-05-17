
/**
 * get-content-profile.js
 *
 * Retrieve oembed content profile
 */

var parser = require('url').parse;
var getOpenGraphProfile = require('./get-open-graph-profile');

module.exports = getContentProfile;

/**
 * Get oembed data
 *
 * @param   Object  opts  Options { url, user_agent, follow, timeout }
 * @return  Object        Standard content profile
 */
function *getContentProfile(opts) {
	var url = parser(opts.url);

	return yield getOpenGraphProfile(opts);
};
