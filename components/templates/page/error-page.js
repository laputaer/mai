
/**
 * error-page.js
 *
 * Template for error page
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
	var error = $('div.page-section-feedback', [
		$('h1.title', data.error_status)
		, $('p.subtitle', data.error_message)
	]);

	var feedback = $('div.page-section-feedback', [
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

	var errorOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var message = $('div', errorOpts, [
		error
		, feedback
	]);

	return message;
};
