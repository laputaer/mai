
/**
 * form-group.js
 *
 * Template for default form input group
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
	var groupOpts = {
		id: 'form-' + data.id
		, key: 'form-' + data.id
		, className: 'form-group'
	};

	var labelOpts = {
		attributes: {
			'for': data.id
		}
		, className: 'form-label'
	};

	var inputOpts = {
		placeholder: i18n.t(data.label + '-placeholder')
		, name: data.name
		, id: data.id
		, value: data.value
		, className: 'form-field'
	};

	var group = $('div', groupOpts, [
		$('label', labelOpts, [
			$('span.main', i18n.t(data.label))
			, $('span.note', i18n.t(data.label + '-note'))
		])
		, $('input', inputOpts)
	]);

	return group;
};