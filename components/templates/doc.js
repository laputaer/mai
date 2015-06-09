
/**
 * doc.js
 *
 * Render <html> document
 */

var $ = require('./vdom');

module.exports = template;

function template(data) {
	var head = $('head', data.head);

	var body = $('body', data.body);

	var html = $('html', {
		lang: data.locale
	}, [head, body]);

	return html;
};
