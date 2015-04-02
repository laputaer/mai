
/**
 * page-landing.js
 *
 * Template for landing page body
 */

var h = require('virtual-dom/h');
var svg = require('virtual-dom/virtual-hyperscript/svg');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var i18n = data.i18n;
	var v = data.version;

	var content;
	if (data.user) {
		content = h('div.profile', [
			h('img.avatar', {
				src: data.user.avatar
				, alt: data.user.login
			})
			, h('a.link', {
				href: 'https://' + data.user.provider + '.com/' + data.user.login
			}, data.user.name)
			, h('p.line', i18n.t('main.thanks'))
		]);
	} else {
		content = h('div.promise', [
			h('p.line', i18n.t('main.line-1'))
			, h('p.line', i18n.t('main.line-2'))
			, h('p.line', i18n.t('main.line-3'))
			, h('p.line', i18n.t('main.line-4'))
		]);
	}

	var section = h('div.section', content);

	var main = h('div.page-landing', [
		h('div.intro', [
			h('h1.title.lang', {
				lang: 'en'
			}, i18n.t('intro.title-1'))
			, h('p.subtitle', i18n.t('intro.subtitle-1'))
		])
		, h('div.menu', [
			h('ul.nav', [
				h('li.item', [
					h('a.m-button.rounded', {
						'href': '/'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#squares'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.toggle'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '/'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#home'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.home'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '/home'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#heart'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.my'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '/ranking'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#graph_rising'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.ranking'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '/help'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#compass'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.help'))
					])
				])
			])
			, h('ul.login', [
				h('li.item', [
					h('a.m-button.rounded', {
						'href': '/connect/twitter'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#twitter'
							})
						])
						, h('span.m-text', i18n.t('menu.login.twitter'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '/connect/github'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg?' + v.asset + '#github'
							})
						])
						, h('span.m-text', i18n.t('menu.login.github'))
					])
				])
			])
		])
		, section
	]);

	return main;
};
