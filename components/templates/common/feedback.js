
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
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var feedbackOpts = {
		className: data.name || ''
	};

	var feedback = $('div', feedbackOpts, [
		$('h1.title', i18n.t('error.feedback'))
		, $('p.subtitle', [
			$('span', i18n.t('error.feedback-contact-1'))
			, $('a.m-link', {
				href: 'https://twitter.com/bitinn'
				, target: '_blank'
			}, [
				$('span.m-text', i18n.t('error.feedback-contact-1-name'))
			])
			, $('span', i18n.t('error.feedback-contact-2'))
			, $('a.m-link', {
				href: 'https://github.com/maihq/feedbacks'
				, target: '_blank'
			}, [
				$('span.m-text', i18n.t('error.feedback-contact-2-name'))
			])
		])
	]);

	return feedback;
};
