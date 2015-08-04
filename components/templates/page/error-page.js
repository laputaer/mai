
/**
 * error-page.js
 *
 * Template for error page
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var feedbackTemplate = require('../common/feedback');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template(data) {
	var error = $('div.page-section-feedback', [
		$('h1.title', i18n.t('error.status-code', { code: data.error_status }))
		, $('p.subtitle', data.error_message)
	]);

	var feedback = feedbackTemplate({
		name: 'page-section-feedback'
	});

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
