
/**
 * doc.js
 *
 * Render <html> document
 */

var h = require('virtual-dom/h');

module.exports = template;

function template(data) {
	var head = h('head', data.head);

	var body = h('body', data.body);

	var html = h('html', {
		lang: 'zh'
	}, [head, body]);

	return html;
};
