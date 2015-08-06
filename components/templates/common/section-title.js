
/**
 * section-title.js
 *
 * Template for page section title
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

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

	// extra margin
	if (data.top) {
		sectionOpts.className += ' extra-top';
	}

	if (!data.bottom) {
		sectionOpts.className += ' no-bottom';
	}

	var wrapperOpts = {
		className: 'wrapper'
	};

	// plain title or tabs
	var content;

	if (data.title) {
		content = $('h2.title', i18n.t(data.title));
	}

	if (data.tabs) {
		content = data.tabs.map(function (tab, i) {
			// tab data to send
			var tabData = {
				order: data.orders ? data.orders[i] : i
				, view: data.key + '-section'
			};

			// tab handler
			var tabOpts = {
				href: '#'
				, className: 'title tab'
				, 'ev-click': emitter.capture('page:tab:change', tabData)
			};

			// tab state
			if (tabData.order === data.active) {
				tabOpts.className += ' active';
			}

			return $('a', tabOpts, i18n.t(tab));
		});

		wrapperOpts.className += ' tabs';
	}

	var title = $('div', sectionOpts, $('div', wrapperOpts, content));

	return title;
};