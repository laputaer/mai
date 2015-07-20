
/**
 * doc.js
 *
 * Render document
 */

var templates = require('../templates/index');

module.exports = builder;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function builder(data) {
	data.header = templates.common.header(data);
	data.footer = templates.common.footer(data);
	data.discover = templates.common.discover(data);
	data.login = templates.common.loginScreen(data);

	data.page = templates.main(data);

	if (data.client) {
		return data.page;
	}

	data.head = templates.head(data);
	data.body = templates.body(data);

	return templates.doc(data);
};
