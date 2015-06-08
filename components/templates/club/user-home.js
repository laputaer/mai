
/**
 * user-home.js
 *
 * Template for default user club home
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
	var search = $('div.m-rows', [
		$('div.m-content.m-row-2', [
			$('div.m-section.yellow.lead', [
				$('h1.m-subtitle', i18n.t('club.create-club'))
				, $('p.m-line', i18n.t('club.create-club-intro', data.user))
				, data.club_create_button
			])
			, $('div.m-section.blue', [
				$('h1.m-subtitle', i18n.t('club.search-club'))
				, $('form.m-form', {
					action: '/c/club-search'
					, method: 'GET'
				}, [
					data.search_group
				])
			])
			, $('div.m-section.green', [
				$('h1.m-subtitle', i18n.t('club.owned-club'))
				, $('div.m-list', data.my_club_buttons)
			])
			, $('div.m-section.green', [
				$('h1.m-subtitle', i18n.t('club.joined-club'))
				, $('div.m-list', data.my_joined_club_buttons)
			])
		])
	]);

	return search;
};