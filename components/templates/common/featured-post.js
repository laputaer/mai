
/**
 * featured-post.js
 *
 * Template for feature post listing
 */

var $ = require('../vdom');
var i18n = require('../i18n')();
var emitter = require('../emitter');

var buttonTemplate = require('./button');
var postButtonTemplate = require('./post-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var prefix = data.prefix || 'post';

	var postOpts = {
		id: prefix + '-' + data.pid
		, key: prefix + '-' + data.pid
		, className: 'featured-post'
	};

	var image, user, club;

	if (data.image) {
		image = $('img.thumbnail.lazyload', {
			attributes: {
				'data-srcset': data.image + '&size=sq-small 80w, '
					+ data.image + '&size=sq-medium 100w, '
					+ data.image + '&size=sq-large 200w'
				, 'data-sizes': 'auto'
			}
			, src: data.image + '&size=sq-small'
			, alt: data.title + i18n.t('message.common.image-preview')
		});

		image = $('div.image-column', image);
	}

	var link = $('p.link', $('a', {
		href: data.url
		, target: '_blank'
		, title: data.doc_title
	}, data.domain));

	var title = $('p.title', data.title || data.doc_title);

	if (data.user) {
		user = postButtonTemplate({
			href: '/u/' + data.user
			, className: 'plain internal'
			, text: data.user_login
			, icon: data.user_avatar
			, title: data.user_name
		});
	}

	if (data.club) {
		club = postButtonTemplate({
			href: '/c/' + data.club
			, className: 'plain internal'
			, text: data.club_name
			, icon: data.club_image
			, title: data.club_intro
		});
	}

	var favoriteOpts = {
		id: data.pid
		, order: data.num
		, view: data.view
	};
	var favorite = buttonTemplate({
		href: '#'
		, className: data.current_user_fav ? 'plain action active' : 'plain action'
		, value: data.fav_point || '0'
		, icon: 'heart'
		, version: data.version
		, eventName: 'ev-click'
		, eventHandler: data.current_user_fav ?
			emitter.capture('page:favorite:remove', favoriteOpts)
			: emitter.capture('page:favorite:create', favoriteOpts)
	});

	var post = $('article', postOpts, [
		$('div.wrapper', [
			image
			, $('div.text-column', [
				link
				, title
			])
		])
		, $('div.action-block', [
			user
			, club
			, favorite
		])
	]);

	return post;
};
