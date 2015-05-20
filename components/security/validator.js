
/**
 * validator.js
 *
 * Extend default validator with our own rules
 */

var validator = require('validator');
var getType = require('../helpers/get-variable-type');

// add some common ruleset of our own

// supported input: must be string
validator.supported = function(value) {
	if (getType(value) !== 'String') {
		return false;
	}

	return true;
};

// valid url: must be string, between 1-1024 chars, has http(s) protocol, not localhost
validator.testUrl = function(value) {
	return validator.supported(value)
		&& validator.isLength(value, 1, 1024)
		&& validator.isURL(value, {
			protocols: ['https', 'http']
			, require_protocol: true
			, host_blacklist: ['localhost', '127.0.0.1']
		});
};

module.exports = validator;
