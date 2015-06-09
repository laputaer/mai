
/**
 * post-item.js
 *
 * Template for post content in club profile
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
	// TODO: should we make sure they both exist?
	var post = data.post;
	var embed = post.embed;

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

	var title;
	if (post.title) {
		title = $('h2.m-title', post.title);
	}

	var summary;
	if (post.summary) {
		summary = $('p.m-quote', post.summary);
	}

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
	if (post.user) {
		author = $('p.m-author', [
			$('span', i18n.t('club.posted-by'))
			, $('a.m-link', {
				href: '/u/' + post.user
			}, [
				$('span.m-text', post.user_name)
			])
		]);
	}

	var item = $('div.m-post', [
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