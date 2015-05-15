
/**
 * oembed.js
 *
 * Export oembed domain model
 */

var getImageProfile = require('./oembed/get-image-profile');
var getContentProfile = require('./oembed/get-content-profile');

module.exports = {
	getImageProfile: getImageProfile
	, getContentProfile: getContentProfile
};
