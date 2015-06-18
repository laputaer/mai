
/**
 * doc.js
 *
 * Render <html> document
 */

var $ = require('./vdom');

module.exports = template;

function template(data) {
	var html = $('html', {
		lang: data.locale
	}, [
		data.head
		, data.body
	]);

	return html;
};
