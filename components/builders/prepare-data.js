
/**
 * prepare-data.js
 *
 * A helper to prepare render data
 */

var removeSlash = require('../helpers/remove-trailing-slash');

module.exports = prepareData;

/**
 * Prepare common render data
 *
 * @param   Object  ctx  Koa context
 * @return  Object       Render data
 */
function prepareData(ctx) {
	var data = {};

	// translation
	data.i18n = ctx.i18n;
	// asset version
	data.version = ctx.config.version;
	// login user session
	data.current_user = ctx.state.user;
	// current path
	data.path = removeSlash(ctx.path);
	// flash message
	data.flash = ctx.flash;
	// doc.body
	data.body = [];

	return data;
};
