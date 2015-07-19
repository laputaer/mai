
/**
 * output-user.js
 *
 * User output object transform function
 */

module.exports = tranform;

/**
 * Transform input object
 *
 * @param   Object  input  Input object
 * @return  Object         Transformed input object
 */
function tranform(input) {
	var output = {
		uid: input.uid
		, id: input.id
		, provider: input.provider
		, login: input.login
		, name: input.name
		, avatar: input.avatar
	};

	return output;
};
