
/**
 * validator.js
 *
 * Extend default validator with our own rules
 */

var validator = require('validator');
var getType = require('../helpers/get-variable-type');

// check for supported input data types
validator.supported = function(input) {
	// common input
	if (getType(input) === 'Number' || getType(input) === 'String') {
		return true;
	}

	// common empty data
	if (input === NaN || input === undefined || input === null) {
		return true;
	}

	// catch-all
	return false;
};

module.exports = validator;
