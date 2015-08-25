
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

	var appOpts = {
		id: prefix + '-' + data.aid
		, key: prefix + '-' + data.aid
		, className: 'featured-post'
	};

	var appEvent = {
		aid: data.aid
		, view: data.view
		, order: data.num
	};

	var appAction = navButtonTemplate({
		href: '#'
		, className: data.deleted ? 'plain restore' : 'plain delete'
		, icon: data.deleted ? 'music_repeat' : 'trash_bin'
		, version: data.version
		, eventName: data.deleted ? 'page:app:restore' : 'page:app:delete'
		, eventData: appEvent
	});

	var appProfile = $('article', appOpts, [
		$('div.action-block', [
			$('p.internal', data.name)
			, appAction
		])
	]);

	return appProfile;
};
