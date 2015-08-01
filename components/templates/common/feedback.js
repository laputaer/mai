
/**
 * feedback.js
 *
 * Template for generic feedback message
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

module.exports = template;

/**
 * Template defines html structure
 *
 * @return  VNode
 */
function template() {
	var feedback = $('div.page-section-feedback', [
		$('p', i18n.t('placeholder.suggestion'))
		, $('p', [
			$('span', i18n.t('placeholder.main-feedback'))
			, $('a.m-link', {
				href: 'https://twitter.com/bitinn'
				, target: '_blank'
			}, [
				$('span.m-text', '@bitinn')
			])
		])
		, $('p', [
			$('span', i18n.t('placeholder.secondary-feedback'))
			, $('a.m-link', {
				href: 'https://github.com/maihq/feedbacks'
				, target: '_blank'
			}, [
				$('span.m-text', i18n.t('placeholder.secondary-feedback-name'))
			])
			, $('span', i18n.t('placeholder.secondary-feedback-action'))
		])
	]);

	return feedback;
};
