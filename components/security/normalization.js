
/**
 * normalization.js
 *
 * Normalize an input object according certain spec
 */

var transform = require('./transform');

module.exports = normalize;

/**
 * Normalize input object
 *
 * @param   Object  input  Input object
 * @param   String  name   Spec name
 * @return  Object         Normalized input object
 */
function normalize(input, name) {
	if (!transform[name]) {
		throw new Error('transform rule: ' + name + ' not found');
	}

	return transform[name](input);
};
