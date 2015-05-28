
/**
 * club-ranking.js
 *
 * Render club ranking page body
 */

var templates = require('../templates/index');

module.exports = partial;

/**
 * Populates templates with data
 *
 * @param   Object  data  From data source
 * @return  Object
 */
function partial(data) {
	var i18n = data.i18n;
	var xss = data.xss;

	data.ranking_result = data.clubs.map(function(club) {
		var button = {
			href: '/c/' + xss.path(club.slug)
			, icon: 'arrow_right'
			, text: xss.data(club.title)
			, version: data.version.asset
			, base_url: data.base_url
		};
		return templates.common.button(button);
	});

	data.main = templates.page.ranking(data);

	data.page_title = i18n.t('menu.nav.ranking');

	return data;
};
