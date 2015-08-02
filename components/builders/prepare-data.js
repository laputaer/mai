
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

	// locale
	data.locale = ctx.locale;
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
	// site base url
	data.base_url = ctx.state.base_url;
	// image base url
	data.image_base_url = ctx.state.image_base_url;
	// inline css
	data.inline_css = ctx.state.inline_css;
	// inline js
	data.inline_js = ctx.state.inline_js;
	// environment
	data.production = ctx.state.production;
	// client-side ui state
	data.ui = {};
	// doc.head content
	data.head = [];
	// doc.body content
	data.body = [];

	return data;
};
