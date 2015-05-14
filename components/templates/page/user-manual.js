
/**
 * user-manual.js
 *
 * Template for user manual content
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
	var placeholder = h('div.m-rows', [
		h('div.m-row-2.m-content', [
			h('div.m-section.blue.lead', [
				h('h1.m-subtitle', i18n.t('help.main-title'))
				, h('p.m-line', i18n.t('help.main-title-note'))
				, h('p.m-line', i18n.t('help.main-title-suggestion'))
				, h('p.m-line', [
					h('span', i18n.t('placeholder.main-feedback'))
					, h('a.m-link', {
						href: 'https://twitter.com/bitinn'
						, target: '_blank'
					}, [
						h('span.m-text.en', '@bitinn')
					])
					, h('span', i18n.t('placeholder.secondary-feedback'))
					, h('a.m-link', {
						href: 'https://github.com/maihq/feedbacks'
						, target: '_blank'
					}, [
						h('span.m-text', i18n.t('placeholder.secondary-feedback-name'))
					])
					, h('span', i18n.t('placeholder.secondary-feedback-action'))
				])
			])
			, h('div.m-section.green', [
				h('h2.m-subtitle', i18n.t('help.about-us-question'))
				, h('p.m-line', i18n.t('help.about-us-answer-1'))
				, h('p.m-line', i18n.t('help.about-us-answer-2'))
				, h('p.m-line', i18n.t('help.about-us-answer-3'))
			])
			, h('div.m-section.green', [
				h('h2.m-subtitle', i18n.t('help.why-us-question'))
				, h('p.m-line', i18n.t('help.why-us-answer-1'))
				, h('p.m-line', i18n.t('help.why-us-answer-2'))
			])
			, h('div.m-section.green', [
				h('h2.m-subtitle', i18n.t('help.explain-tagline-question'))
				, h('p.m-line', i18n.t('help.explain-tagline-answer-1'))
				, h('p.m-line', i18n.t('help.explain-tagline-answer-2'))
			])
		])
	]);

	return placeholder;
};