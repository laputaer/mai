
/**
 * club-profile.js
 *
 * Render club profile body
 */

var profileTemplate = require('../templates/club/profile');
var buttonTemplate = require('../templates/common/button');

var bodyBuilder = require('./body');

module.exports = renderer;

/**
 * Renderer populates templates with data
 *
 * @param   Object  data  From data source
 * @return  VNode
 */
function renderer(data) {
	var i18n = data.i18n;
	data.join_club_button = buttonTemplate({
		href: '/c/' + data.club.slug + '/join'
		, icon: 'dialogue_happy'
		, text: data.i18n.t('club.join-button')
		, type: ['large', 'accept']
		, version: data.version.asset
	})
	data.share_club_button = buttonTemplate({
		href: 'https://twitter.com/intent/tweet?text='
			+ i18n.t('club.share-button-text', data.club)
			+ '&url='
			+ encodeURIComponent(data.current_url)
		, icon: 'twitter'
		, text: data.i18n.t('club.share-button')
		, type: ['large', 'twitter']
		, version: data.version.asset
	})
	data.main = profileTemplate(data);

	return bodyBuilder(data);
};
