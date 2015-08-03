
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
		id: data.key
		, key: data.key
		, className: 'page-section-title'
	};

	if (data.top) {
		sectionOpts.className += ' extra-top';
	}

	if (!data.bottom) {
		sectionOpts.className += ' no-bottom';
	}

	var wrapperOpts = {
		className: 'wrapper'
	};

	var content;
	if (data.title) {
		content = $('h2.title', i18n.t(data.title));
	} else if (data.tabs) {
		content = data.tabs.map(function (tab, i) {
			var tabOpts = {
				href: '#'
				, className: 'title tab'
			};

			if (i === data.active || (i === 0 && !data.active)) {
				tabOpts.className += ' active';
			}

			return $('a', tabOpts, i18n.t(tab));
		});

		wrapperOpts.className += ' tabs';
	}

	var title = $('div', sectionOpts, $('div', wrapperOpts, content));

	return title;
};