
/**
 * section-title.js
 *
 * Template for page section title
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var sectionOpts = {
		className: 'page-section-title'
	};

	if (data.top) {
		sectionOpts.className += ' extra-margin-top';
	}

	if (data.bottom) {
		sectionOpts.className += ' extra-margin-bottom';
	}

	if (data.key) {
		sectionOpts.id = data.key;
		sectionOpts.key = data.key;
	}

	var title = $('div', sectionOpts, $('div.wrapper', [
		$('h2.title', i18n.t(data.title))
	]));

	return title;
};