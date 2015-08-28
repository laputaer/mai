
/**
 * stash-item.js
 *
 * Template for user stash listing
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
		id: prefix + '-' + data.sid
		, key: prefix + '-' + data.sid
		, className: 'featured-post'
	};

	var link = $('p.link', $('a', {
		href: data.url
		, target: '_blank'
	}, data.domain));

	var title = $('p.title', {
		title: data.title || ''
	}, data.title || i18n.t('fallback.stash.title'));

	var image = navButtonTemplate({
		href: data.url
		, className: 'plain internal'
		, image: data.favicon
		, size: 'sq-tiny'
		, target: '_blank'
		, square: true
	});

	var actionEvent = {
		sid: data.sid
		, view: data.view
		, order: data.num
		, route: 'stash_item'
	};

	var action = navButtonTemplate({
		href: '#'
		, className: data.deleted ? 'plain restore control c1' : 'plain delete control c1'
		, icon: data.deleted ? 'music_repeat' : 'trash_bin'
		, version: data.version
		, eventName: data.deleted ? 'page:item:restore' : 'page:item:delete'
		, eventData: actionEvent
	});

	var post = $('article', postOpts, [
		$('div.wrapper', [
			$('div.text-column', [
				link
				, title
			])
		])
		, $('div.action-block', [
			image
			, action
		])
	]);

	return post;
};
