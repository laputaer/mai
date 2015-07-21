
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
	var postOpts = {
		id: data.pid
		, key: data.pid
		, className: 'featured-post'
	};

	if (data.num === 0) {
		postOpts.className += ' section-inset';
	}

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
			, alt: data.title + i18n.t('placeholder.image-preview')
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

	var heart = buttonTemplate({
		href: '#'
		, className: 'plain action'
		, value: data.heart || '0'
		, icon: 'heart'
		, version: data.version
		, eventName: 'ev-click'
		, eventHandler: emitter.capture('page:heart', data.pid)
	});

	var post = $('div', postOpts, [
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
			, heart
		])
	]);

	return post;
};
