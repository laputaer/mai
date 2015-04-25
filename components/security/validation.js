
/**
 * validation.js
 *
 * A helper function for object schema validation
 */

var schema = require('./schema');

module.exports = validate;

/**
 * Validate an object based on schema definitions
 *
 * @param   Object   data  Object to validate
 * @param   String   name  Schema name
 * @return  Promise
 */
function validate(data, name) {
	if (!schema[name]) {
		return Promise.reject(new Error('schema name: ' + name + ' not found'));
	}

	return schema[name].validate(data);
};
