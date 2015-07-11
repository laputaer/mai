
/**
 * user-manual.js
 *
 * Template for user manual content
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
function template() {
	var placeholder = $('div.m-rows#help', { key: 'help' }, [
		$('div.m-row-2.m-content', [
			$('div.m-section.blue.lead', [
				$('h1.m-subtitle', i18n.t('help.main-title'))
				, $('p.m-line', i18n.t('help.main-title-note'))
				, $('p.m-line', i18n.t('help.main-title-suggestion'))
				, $('p.m-line', [
					$('span', i18n.t('placeholder.main-feedback'))
					, $('a.m-link', {
						href: 'https://twitter.com/bitinn'
						, target: '_blank'
					}, [
						$('span.m-text', '@bitinn')
					])
					, $('span', i18n.t('placeholder.secondary-feedback'))
					, $('a.m-link', {
						href: 'https://github.com/maihq/feedbacks'
						, target: '_blank'
					}, [
						$('span.m-text', i18n.t('placeholder.secondary-feedback-name'))
					])
					, $('span', i18n.t('placeholder.secondary-feedback-action'))
				])
			])
			, $('div.m-section.green#about-us', [
				$('h2.m-subtitle', i18n.t('help.about-us-question'))
				, $('p.m-line', i18n.t('help.about-us-answer-1'))
			])
			, $('div.m-section.green#why-us', [
				$('h2.m-subtitle', i18n.t('help.why-us-question'))
				, $('p.m-line', i18n.t('help.why-us-answer-1'))
				, $('p.m-line', i18n.t('help.why-us-answer-2'))
				, $('p.m-line', i18n.t('help.why-us-answer-3'))
			])
			, $('div.m-section.green#about-club', [
				$('h2.m-subtitle', i18n.t('help.about-club-question'))
				, $('p.m-line', i18n.t('help.about-club-answer-1'))
				, $('p.m-line', i18n.t('help.about-club-answer-2'))
			])
			, $('div.m-section.green#about-tagline', [
				$('h2.m-subtitle', i18n.t('help.about-tagline-question'))
				, $('p.m-line', i18n.t('help.about-tagline-answer-1'))
				, $('p.m-line', i18n.t('help.about-tagline-answer-2'))
			])
			, $('div.m-section.blue#club-guideline', [
				$('h2.m-subtitle', i18n.t('help.club-guideline-question'))
				, $('p.m-line', i18n.t('help.club-guideline-answer-1'))
			])
			, $('div.m-section.green#club-naming', [
				$('h2.m-subtitle', i18n.t('help.club-guideline-naming-question'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-1'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-2'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-3'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-4'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-5'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-6'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-7'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-8'))
				, $('p.m-line', i18n.t('help.club-guideline-naming-answer-9'))
			])
			, $('div.m-section.green#club-operation', [
				$('h2.m-subtitle', i18n.t('help.club-guideline-operation-question'))
				, $('p.m-line', i18n.t('help.club-guideline-operation-answer-1'))
				, $('p.m-line', i18n.t('help.club-guideline-operation-answer-2'))
				, $('p.m-line', i18n.t('help.club-guideline-operation-answer-3'))
				, $('p.m-line', i18n.t('help.club-guideline-operation-answer-4'))
				, $('p.m-line', i18n.t('help.club-guideline-operation-answer-5'))
			])
			, $('div.m-section.green#club-content-policy', [
				$('h2.m-subtitle', i18n.t('help.club-guideline-content-question'))
				, $('p.m-line', i18n.t('help.club-guideline-content-answer-1'))
				, $('p.m-line', i18n.t('help.club-guideline-content-answer-2'))
				, $('p.m-line', i18n.t('help.club-guideline-content-answer-3'))
				, $('p.m-line', i18n.t('help.club-guideline-content-answer-4'))
				, $('p.m-line', i18n.t('help.club-guideline-content-answer-5'))
				, $('p.m-line', i18n.t('help.club-guideline-content-answer-6'))
			])
			, $('div.m-section.blue#game-rule', [
				$('h2.m-subtitle', i18n.t('help.game-rule-question'))
				, $('p.m-line', i18n.t('help.game-rule-answer-1'))
				, $('p.m-line', i18n.t('help.game-rule-answer-2'))
			])
			, $('div.m-section.green#user-rule', [
				$('h2.m-subtitle', i18n.t('help.game-rule-user-question'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-1'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-2'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-3'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-4'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-5'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-6'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-7'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-8'))
				, $('p.m-line', i18n.t('help.game-rule-user-answer-9'))
			])
			, $('div.m-section.green#club-rule', [
				$('h2.m-subtitle', i18n.t('help.game-rule-club-question'))
				, $('p.m-line', i18n.t('help.game-rule-club-answer-1'))
				, $('p.m-line', i18n.t('help.game-rule-club-answer-2'))
				, $('p.m-line', i18n.t('help.game-rule-club-answer-3'))
				, $('p.m-line', i18n.t('help.game-rule-club-answer-4'))
				, $('p.m-line', i18n.t('help.game-rule-club-answer-5'))
			])
		])
	]);

	return placeholder;
};