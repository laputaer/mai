
/**
 * options.js
 *
 * Template for options menu
 */

var $ = require('../vdom');
var emitter = require('../emitter');

var navButtonTemplate = require('./navigation-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	// menu
	var menuOpts = {
		key: 'options'
		, id: 'options'
		, className: 'page-menu'
	};

	var menu = $('div', menuOpts, $('div.wrapper', [
		titleButton
		, closeButton
		, $('ul.navigation', [
			$('li.item', homeButton)
			, $('li.item', clubButton)
			, $('li.item', profileButton)
			, $('li.item', rankingButton)
			, $('li.item', helpButton)
		])
	]));

	return menu;
};
