
/**
 * validator.js
 *
 * Extend default validator with our own rules
 */

var validator = require('validator');
var getType = require('../helpers/get-variable-type');

// only use validator for string validation
validator.supported = function(input) {
	// must be string type
	if (getType(input) === 'String') {
		return true;
	}

	// reject the rest
	return false;
};

module.exports = validator;
