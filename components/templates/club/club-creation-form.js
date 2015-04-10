
/**
 * club-creation-form.js
 *
 * Template for new club creation
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
	var attrs = {
		title: ''
		, slug: ''
	};
	var body = {
		title: ''
		, slug: ''
	};

	if (data.flash.type === 'form') {
		data.flash.attrs.forEach(function(attr) {
			if (attrs.hasOwnProperty(attr)) {
				attrs[attr] = '.error';
			}
		});

		body = data.flash.body;
	}

	var club = h('div.club-creation', [
		h('h1.subtitle', i18n.t('club.new-club-intro'))
		, h('p.line', {
			innerHTML: i18n.t('club.new-club-help', {
				help: '<a href="/help" class="link">' + i18n.t('menu.nav.help') + '</a>'
			})
		})
		, h('form.m-form', {
			action: '/club'
			, method: 'POST'
		}, [
			h('div.m-group', [
				h('label.m-label' + attrs.title, {
					attributes: {
						'for': 'club-title'
					}
				}, i18n.t('club.new-club-title'))
				, h('input.m-field' + attrs.title, {
					placeholder: i18n.t('club.new-club-title-placeholder')
					, name: 'title'
					, id: 'club-title'
					, value: body.title
				})
				, h('span.m-note', i18n.t('club.new-club-title-note'))
			])
			, h('div.m-group', [
				h('label.m-label' + attrs.slug, {
					attributes: {
						'for': 'club-slug'
					}
				}, i18n.t('club.new-club-slug'))
				, h('input.m-field' + attrs.slug, {
					placeholder: i18n.t('club.new-club-slug-placeholder')
					, name: 'slug'
					, id: 'club-slug'
					, value: body.slug
				})
				, h('span.m-note', i18n.t('club.new-club-slug-note'))
			])
			, h('div.m-group', [
				h('button.m-submit', {
					type: 'submit'
				}, i18n.t('club.new-club-submit'))
			])
		])
	]);

	return club;
};