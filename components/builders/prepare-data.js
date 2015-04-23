
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

	data.i18n = ctx.i18n;
	data.version = ctx.config.version;
	data.current_user = ctx.state.user;
	data.path = removeSlash(ctx.path);

	return data;
};
