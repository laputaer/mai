
/**
 * featured-post.js
 *
 * Template for feature post listing
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var postButtonTemplate = require('./post-button');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var postOpt = {
		attributes: {
			'data-id': data.pid
		}
	};

	var image, link, title, user, club;

	if (data.num === 0) {
		postOpt.className = 'section-inset';
	}

	if (data.image) {
		image = $('div.thumbnail.lazyload', {
			//src: data.image + '&size=100'
			//, alt: data.title + i18n.t('placeholder.image-preview')
			attributes: {
				'data-bgset': data.image + '&size=100 100w, '
					+ data.image + '&size=200 200w, '
					+ data.image + '&size=400 400w'
				, 'data-sizes': 'auto'
			}
			, style: {
				'background-image': 'url(' + data.image + '&size=100)'
			}
		});
	}

	if (data.user) {
		user = postButtonTemplate({
			href: '/u/' + data.user
			, className: 'rounded internal'
			, text: data.user_login
			, icon: data.user_avatar
		});
	}

	if (data.club) {
		club = postButtonTemplate({
			href: '/c/' + data.club
			, className: 'rounded internal'
			, text: data.club_name
			, icon: data.club_image
		});
	}

	link = $('p.link', $('a', {
		href: data.embed.url
		, target: '_blank'
		, title: data.embed.title
	}, data.domain));

	title = $('p.title', data.title);

	var post = $('div.featured-post', postOpt, [
		$('div.wrapper', [
			$('div.image-column', image)
			, $('div.text-column', [
				link
				, title
			])
		])
		, $('div.action-block', [
			user
			, club
		])
	]);

	return post;
};
