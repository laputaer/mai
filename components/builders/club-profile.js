
/**
 * club-profile.js
 *
 * Render club profile body
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

	// user
	if (data.current_user) {
		data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });

		if (data.current_user.uid === data.club.owner) {
			data.club_management = templates.common.button({
				href: '/c/' + data.club.slug + '/edit'
				, icon: 'setting'
				, text: data.i18n.t('club.edit-club')
				, type: ['small', 'highlight']
				, version: data.version.asset
			});

			data.share_button = templates.common.button({
				href: 'https://twitter.com/intent/tweet?url='
					+ encodeURIComponent(data.current_url)
					+ '&text=' + i18n.t('club.share-owner-text', data.club)
				, icon: 'twitter'
				, text: data.i18n.t('club.share-button')
				, type: ['small', 'twitter']
				, target: '_blank'
				, version: data.version.asset
			});
		}

		if (data.current_user.uid !== data.club.owner && data.membership) {
			data.club_leave = templates.common.formButton({
				icon: 'profile_remove'
				, text: data.i18n.t('club.leave-button')
				, version: data.version.asset
				, type: ['small']
				, name: 'leave'
				, value: '1'
			});

			data.share_button = templates.common.button({
				href: 'https://twitter.com/intent/tweet?url='
					+ encodeURIComponent(data.current_url)
					+ '&text=' + i18n.t('club.share-other-text', data.club)
				, icon: 'twitter'
				, text: data.i18n.t('club.share-button')
				, type: ['small', 'twitter']
				, target: '_blank'
				, version: data.version.asset
			});
		}

		if (data.current_user.uid !== data.club.owner && !data.membership) {
			data.club_join = templates.common.formButton({
				icon: 'profile_add'
				, text: data.i18n.t('club.join-button')
				, type: ['small', 'accept']
				, version: data.version.asset
				, name: 'join'
				, value: '1'
			});
		}

		data.add_post = templates.common.button({
			href: '/c/' + data.club.slug + '/p/post-add'
			, icon: 'dialogue_add'
			, text: data.i18n.t('club.post-button')
			, type: ['small', 'post']
			, version: data.version.asset
		});
	}

	data.club_form_error = templates.common.formError(data);

	data.post_list = data.posts.map(function(post) {
		return templates.club.postItem({
			post: post
			, i18n: i18n
		});
	});
	data.main = templates.club.profile(data);

	return data;
};
