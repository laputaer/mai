
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

	var link;

	if (data.url) {
		link = navButtonTemplate({
			href: data.url
			, className: 'plain internal'
			, title: data.domain
			, value: data.title || i18n.t('fallback.stash.title')
			, image: data.favicon
			, size: 'sq-tiny'
			, target: '_blank'
			, fallback: true
		});
	}

	var post = $('article', postOpts, [
		$('div.action-block', [
			link
		])
	]);

	return post;
};
