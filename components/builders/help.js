
/**
 * help.js
 *
 * Render user manual
 */

var templates = require('../templates/index');
var i18n = require('../templates/i18n')();

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	data.main = templates.page.userManual(data);

	data.page_title = i18n.t('menu.nav.help');

	return data;
};
