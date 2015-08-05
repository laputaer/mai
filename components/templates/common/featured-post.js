
/**
 * featured-post.js
 *
 * Template for feature post listing
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
		user = navButtonTemplate({
			href: '/u/' + data.user
			, className: 'plain internal'
			, title: data.user_name
			, value: data.user_login
			, image: data.user_avatar
			, size: 'sq-tiny'
			, fallback: true
		});
	}

	if (data.club) {
		club = navButtonTemplate({
			href: '/c/' + data.club
			, className: 'plain internal'
			, title: data.club_intro
			, value: data.club_name
			, image: data.club_image
			, size: 'sq-tiny'
			, fallback: true
		});
	}

	var favoriteOpts = {
		id: data.pid
		, order: data.num
		, view: data.view
	};
	var favorite = navButtonTemplate({
		href: '#'
		, className: data.current_user_fav ? 'plain action active' : 'plain action'
		, value: data.fav_point || '0'
		, icon: 'heart'
		, version: data.version
		, eventName: data.current_user_fav ? 'page:favorite:remove' : 'page:favorite:create'
		, eventData: favoriteOpts
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
