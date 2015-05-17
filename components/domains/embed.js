
/**
 * embed.js
 *
 * Export embed domain model
 */

var getImageProfile = require('./embed/get-image-profile');
var getContentProfile = require('./embed/get-content-profile');
var getOpenGraphProfile = require('./embed/get-open-graph-profile');

module.exports = {
	getImageProfile: getImageProfile
	, getContentProfile: getContentProfile
	, getOpenGraphProfile: getOpenGraphProfile
};
