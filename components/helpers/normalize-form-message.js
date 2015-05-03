
/**
 * normalize-form-message.js
 *
 * Handle a flash message object
 */

module.exports = helper;

/**
 * Normalize internal error object
 *
 * @param   Object  flash  Flash object
 * @return  Object         Standard flash object
 */
function helper(flash) {
	if (typeof flash === 'object'
		&& typeof flash.message === 'string'
		&& typeof flash.body === 'object'
		&& flash.attrs instanceof Array
	) {
		return flash;
	}

	return null;
};
