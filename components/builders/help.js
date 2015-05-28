
/**
 * help.js
 *
 * Render user manual
 */

var templates = require('../templates/index');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	data.main = templates.page.userManual(data);

	data.page_title = data.i18n.t('menu.nav.help');

	return data;
};
