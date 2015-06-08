
/**
 * post-preview.js
 *
 * Template for post content preview
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var embed = data.embed;
	var user = data.current_user;

	var images;
	if (embed && embed.image) {
		images = embed.image.map(function(url, index) {
			return $('img.lazyload', {
				src: url + '&size=100'
				, alt: embed.title + i18n.t('placeholder.image-preview')
					+ ' 0' + index.toString()
				, attributes: {
					'data-srcset': url
						+ '&size=100 100w, '
						+ url
						+ '&size=200 200w, '
						+ url
						+ '&size=400 400w'
					, 'data-sizes': 'auto' 
				}
			});
		});

		images = $('div.m-images', images);
	}

	var title = $('h2.m-title', i18n.t('club.post-title'));

	var summary = $('p.m-quote', i18n.t('club.post-summary'));

	var external;
	if (embed.url) {
		external = $('p.m-external', [
			$('a.m-link.external', {
				href: embed.url
				, target: '_blank'
				, title: embed.title
			}, [
				$('span.m-text', embed.domain)
			])
			, $('span', embed.title)
		]);
	}

	var author;
	if (user) {
		author = $('p.m-author', [
			$('span', i18n.t('club.posted-by'))
			, $('a.m-link', {
				href: '/u/' + user.uid
			}, [
				$('span.m-text', user.name)
			])
		]);
	}

	var item = $('div.m-post.preview', [
		images
		, $('div.m-meta', [
			external
			, title
			, summary
			, author
		])
	]);

	return item;
};