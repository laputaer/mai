
/**
 * oauth.js
 *
 * OAuth object transform function
 */

module.exports = tranform;

/**
 * Transform input object
 *
 * @param   Object  input  Input object
 * @return  Object         Transformed input object
 */
function tranform(input) {
	// id: stringify, trim
	if (input.id) {
		input.id = input.id.toString();

		input.id = input.id.trim();
	}

	// login: trim
	if (input.login) {
		input.login = input.login.trim();
	}

	// name: trim, or create one from login
	if (input.name) {
		input.name = input.name.trim();
	} else if (input.login) {
		input.name = input.login;
	}

	// avatar: trim, or fallback to default avatar
	if (input.avatar) {
		input.avatar = input.avatar.trim();
	} else {
		input.avatar = 'https://rubu.me/images/header-640.jpg';
	}

	return input;
};
