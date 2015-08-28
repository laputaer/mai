
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

	var deleteButton = navButtonTemplate({
		href: '#'
		, className: data.deleted ? 'plain restore control c1' : 'plain delete control c1'
		, icon: data.deleted ? 'music_repeat' : 'trash_bin'
		, version: data.version
		, eventName: data.deleted ? 'page:item:restore' : 'page:item:delete'
		, eventData: actionEvent
	});

	var shareEvent = {
		view: data.view
		, order: data.num
	};

	var shareButton = navButtonTemplate({
		href: '#'
		, className: data.deleted ? 'plain hidden control c2' : 'plain share control c2'
		, icon: 'share'
		, version: data.version
		, eventName: data.sharing ? 'page:share:close' : 'page:share:open'
		, eventData: shareEvent
	});

	var shareStashEvent = {
		sid: data.sid
		, prefix: prefix
	};

	var shareOpts = {
		className: data.sharing ? 'share-block active' : 'share-block'
		, 'ev-change': emitter.capture('page:stash:share', shareStashEvent)
	};

	var shareListOpts = {
		id: prefix + '-' + data.sid + '-share-list'
		, className: 'share-list'
	};

	var shareList;
	if (data.sharing) {
		shareList = data.share_list.map(function (item) {
			return $('option', {
				value: item.slug
			}, item.title + ' [' + item.slug + ']');
		});
	}

	var shareBlock = $('div', shareOpts, [
		$('p.share-text', i18n.t('profile.user.share-list'))
		, $('select', shareListOpts, shareList)
	]);

	var post = $('article', postOpts, [
		$('div.wrapper', [
			$('div.text-column', [
				link
				, title
			])
		])
		, $('div.action-block', [
			image
			, deleteButton
			, shareButton
		])
		, shareBlock
	]);

	return post;
};
