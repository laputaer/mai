
/**
 * user-app.js
 *
 * Template for app password listing
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
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
	var prefix = data.prefix || 'app';

	var postOpts = {
		id: prefix + '-' + data.aid
		, key: prefix + '-' + data.aid
		, className: 'featured-post'
	};

	var favoriteOpts = {
		name: data.name
	};

	var favorite = navButtonTemplate({
		href: '#'
		, className: 'plain delete'
		, icon: 'delete'
		, version: data.version
		, eventName: 'page:app:remove'
		, eventData: favoriteOpts
	});

	var post = $('article', postOpts, [
		$('div.action-block', [
			$('p.internal', data.name)
			, favorite
		])
	]);

	return post;
};
