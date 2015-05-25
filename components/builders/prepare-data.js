
/**
 * prepare-data.js
 *
 * A helper to prepare render data
 */

var removeSlash = require('../helpers/remove-trailing-slash');
var normalizeFlash = require('../helpers/normalize-form-message');

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
	// locale
	data.locale = ctx.locale;
	// xss filters
	data.xss = ctx.xss;
	// asset version
	data.version = ctx.config.version;
	// flash message
	data.flash = normalizeFlash(ctx.flash);
	// login user session
	data.current_user = ctx.state.user;
	// current path
	data.current_path = removeSlash(ctx.path);
	// current url
	data.current_url = ctx.request.href;
	// asset base url
	data.base_url = ctx.state.base_url;
	// doc.head content
	data.head = [];
	// doc.body content
	data.body = [];

	return data;
};
