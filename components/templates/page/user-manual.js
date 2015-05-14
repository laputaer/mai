
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
			, h('div.m-section.green#about-us', [
				h('h2.m-subtitle', i18n.t('help.about-us-question'))
				, h('p.m-line', i18n.t('help.about-us-answer-1'))
			])
			, h('div.m-section.green#why-us', [
				h('h2.m-subtitle', i18n.t('help.why-us-question'))
				, h('p.m-line', i18n.t('help.why-us-answer-1'))
				, h('p.m-line', i18n.t('help.why-us-answer-2'))
				, h('p.m-line', i18n.t('help.why-us-answer-3'))
			])
			, h('div.m-section.green#about-club', [
				h('h2.m-subtitle', i18n.t('help.about-club-question'))
				, h('p.m-line', i18n.t('help.about-club-answer-1'))
				, h('p.m-line', i18n.t('help.about-club-answer-2'))
			])
			, h('div.m-section.green#about-tagline', [
				h('h2.m-subtitle', i18n.t('help.about-tagline-question'))
				, h('p.m-line', i18n.t('help.about-tagline-answer-1'))
				, h('p.m-line', i18n.t('help.about-tagline-answer-2'))
			])
			, h('div.m-section.blue#club-guideline', [
				h('h2.m-subtitle', i18n.t('help.club-guideline-question'))
				, h('p.m-line', i18n.t('help.club-guideline-answer-1'))
			])
			, h('div.m-section.red#club-naming', [
				h('h2.m-subtitle', i18n.t('help.club-guideline-naming-question'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-1'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-2'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-3'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-4'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-5'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-6'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-7'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-8'))
				, h('p.m-line', i18n.t('help.club-guideline-naming-answer-9'))
			])
			, h('div.m-section.red#club-operation', [
				h('h2.m-subtitle', i18n.t('help.club-guideline-operation-question'))
				, h('p.m-line', i18n.t('help.club-guideline-operation-answer-1'))
				, h('p.m-line', i18n.t('help.club-guideline-operation-answer-2'))
				, h('p.m-line', i18n.t('help.club-guideline-operation-answer-3'))
				, h('p.m-line', i18n.t('help.club-guideline-operation-answer-4'))
				, h('p.m-line', i18n.t('help.club-guideline-operation-answer-5'))
			])
			, h('div.m-section.blue#game-rule', [
				h('h2.m-subtitle', i18n.t('help.game-rule-question'))
				, h('p.m-line', i18n.t('help.game-rule-answer-1'))
				, h('p.m-line', i18n.t('help.game-rule-answer-2'))
			])
			, h('div.m-section.yellow#user-rule', [
				h('h2.m-subtitle', i18n.t('help.game-rule-user-question'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-1'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-2'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-3'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-4'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-5'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-6'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-7'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-8'))
				, h('p.m-line', i18n.t('help.game-rule-user-answer-9'))
			])
			, h('div.m-section.yellow#club-rule', [
				h('h2.m-subtitle', i18n.t('help.game-rule-club-question'))
				, h('p.m-line', i18n.t('help.game-rule-club-answer-1'))
				, h('p.m-line', i18n.t('help.game-rule-club-answer-2'))
				, h('p.m-line', i18n.t('help.game-rule-club-answer-3'))
				, h('p.m-line', i18n.t('help.game-rule-club-answer-4'))
				, h('p.m-line', i18n.t('help.game-rule-club-answer-5'))
			])
		])
	]);

	return placeholder;
};