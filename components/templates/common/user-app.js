
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
	var prefix = data.prefix || 'stash';

	var postOpts = {
		id: prefix + '-' + data.aid
		, key: prefix + '-' + data.aid
		, className: 'featured-post'
	};

	var favoriteOpts = {
		id: data.name
		, order: data.num
		, view: data.view
	};

	var favorite = navButtonTemplate({
		href: '#'
		, className: data.current_user_fav ? 'plain heart active' : 'plain heart'
		, value: data.fav_point || '0'
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
