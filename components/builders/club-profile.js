
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
	var xss = data.xss;

	// user
	if (data.current_user) {
		data.csrf_field = templates.common.csrfField({ csrf_token: data.current_user.csrf_token });

		if (data.current_user.uid === data.club.owner) {
			data.club_management = templates.common.button({
				href: '/c/' + xss.path(data.club.slug) + '/edit'
				, icon: 'setting'
				, text: data.i18n.t('club.edit-club')
				, type: ['small', 'highlight']
				, version: data.version.asset
				, base_url: data.base_url
			});

			data.share_button = templates.common.button({
				href: 'https://twitter.com/intent/tweet?url='
					+ xss.encode(data.current_url)
					+ '&text=' + i18n.t('club.share-owner-text', {
						title: xss.data(data.club.title)
					})
				, icon: 'twitter'
				, text: data.i18n.t('club.share-button')
				, type: ['small', 'twitter']
				, target: '_blank'
				, version: data.version.asset
				, base_url: data.base_url
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
				, base_url: data.base_url
			});

			data.share_button = templates.common.button({
				href: 'https://twitter.com/intent/tweet?url='
					+ xss.encode(data.current_url)
					+ '&text=' + i18n.t('club.share-other-text', {
						title: xss.data(data.club.title)
					})
				, icon: 'twitter'
				, text: data.i18n.t('club.share-button')
				, type: ['small', 'twitter']
				, target: '_blank'
				, version: data.version.asset
				, base_url: data.base_url
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
				, base_url: data.base_url
			});
		}

		data.add_post = templates.common.button({
			href: '/c/' + xss.path(data.club.slug) + '/p/post-add'
			, icon: 'dialogue_add'
			, text: data.i18n.t('club.post-button')
			, type: ['small', 'post']
			, version: data.version.asset
			, base_url: data.base_url
		});
	}

	data.club_form_error = templates.common.formError(data);

	data.post_list = data.posts.map(function(post) {
		return templates.club.postItem({
			post: post
			, i18n: i18n
			, xss: xss
		});
	});

	data.main = templates.club.profile(data);

	data.page_title = data.club.title;
	data.page_description = data.club.intro;

	data.page_opengraph = {
		title: data.club.title
		, url: data.canonical_url
		, image: data.club.full_avatar
	};

	return data;
};
