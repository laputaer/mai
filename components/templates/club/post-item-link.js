
/**
 * post-item-link.js (deprecated)
 *
 * Template for simple post content in home page
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
	var post = data.post;

	if (!post || !post.embed) {
		return;
	}

	var embed = post.embed;

	var item = $('div.m-post', [
		$('p.m-meta', [
			$('a.m-link', {
				href: '/u/' + post.user
			}, [
				$('span', post.user_name)
			])
			, $('span', i18n.t('club.activity-item-1'))
			, $('a.m-link', {
				href: '/c/' + post.club
			}, [
				$('span', post.club_name)
			])
			, $('span', i18n.t('club.activity-item-2'))
			, $('a.m-link', {
				href: embed.site_url
				, target: '_blank'
			}, [
				$('span', embed.site_name)
			])
			, $('span', i18n.t('club.activity-item-3'))
			, $('a.m-link', {
				href: embed.url
				, target: '_blank'
			}, [
				$('span', embed.title)
			])
		])
	]);

	return item;
};