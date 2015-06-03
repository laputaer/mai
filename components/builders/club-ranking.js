
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
		return templates.common.clubPreview({
			club: club
			, i18n: i18n
			, xss: xss
		});
	});

	data.main = templates.page.ranking(data);

	data.page_title = i18n.t('menu.nav.ranking');

	return data;
};
