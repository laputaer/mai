
/**
 * club-profile.js
 *
 * Render club profile body
 */

var profileTemplate = require('../templates/club/profile');
var buttonTemplate = require('../templates/common/button');
var formButtonTemplate = require('../templates/common/form-button');
var csrfFieldTemplate = require('../templates/common/csrf-field');

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

	// owner
	if (data.current_user && data.current_user.uid === data.club.owner) {
		data.club_management = buttonTemplate({
			href: '/c/' + data.club.slug + '/edit'
			, icon: 'setting'
			, text: data.i18n.t('club.owner-management')
			, type: ['small']
			, version: data.version.asset
		});
	}

	// user
	if (data.current_user && data.current_user.uid !== data.club.owner) {
		data.csrf_field = csrfFieldTemplate({ csrf_token: data.current_user.csrf_token });

		if (!data.membership) {
			data.club_join = formButtonTemplate({
				icon: 'profile_add'
				, text: data.i18n.t('club.join-button')
				, type: ['accept']
				, version: data.version.asset
				, name: 'put'
				, value: '1'
			});
		} else {
			data.club_leave = formButtonTemplate({
				icon: 'profile_remove'
				, text: data.i18n.t('club.leave-button')
				, version: data.version.asset
				, name: 'del'
				, value: '1'
			});
		}
	}

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
