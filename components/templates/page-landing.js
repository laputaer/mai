
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
						'href': '#'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg#home'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.home'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '#'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg#heart'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.my'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '#'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg#graph_rising'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.ranking'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '#'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg#compass'
							})
						])
						, h('span.m-text', i18n.t('menu.nav.recent'))
					])
				])
			])
			, h('ul.login', [
				h('li.item', [
					h('a.m-button.rounded', {
						'href': '#'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg#twitter'
							})
						])
						, h('span.m-text', i18n.t('menu.login.twitter'))
					])
				])
				, h('li.item', [
					h('a.m-button.rounded', {
						'href': '#'
					}, [
						svg('svg.m-icon', [
							svg('use', {
								'xlink:href': '/assets/icons.svg#github'
							})
						])
						, h('span.m-text', i18n.t('menu.login.github'))
					])
				])
			])
		])
	]);

	return main;
};
