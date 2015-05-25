
/**
 * transform.js
 *
 * Export object transform rules
 */

var opengraph = require('./transform/opengraph');
var oauth = require('./transform/oauth');

module.exports = {
	opengraph: opengraph
	, oauth: oauth
};
