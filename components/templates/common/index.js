
/**
 * index.js
 *
 * Group template together for client-side rendering
 */

module.exports = {
	button: require('./button')
	, csrfField: require('./csrf-field')
	, customError: require('./custom-error')
	, formButton: require('./form-button')
	, formError: require('./form-error')
	, formGroup: require('./form-group')
	, formSubmit: require('./form-submit')
	, heading: require('./heading')
	, internalError: require('./internal-error')
	, login: require('./login')
	, menu: require('./menu')
	, notFoundError: require('./not-found-error')
	, oauthError: require('./oauth-error')
	, placeholder: require('./placeholder')
	, simpleUser: require('./simple-user')
};
