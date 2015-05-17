
/**
 * embed.js
 *
 * Export embed domain model
 */

var getImageProfile = require('./oembed/get-image-profile');
var getContentProfile = require('./oembed/get-content-profile');
var getOpenGraphProfile = require('./oembed/get-open-graph-profile');

module.exports = {
	getImageProfile: getImageProfile
	, getContentProfile: getContentProfile
	, getOpenGraphProfile: getOpenGraphProfile
};
