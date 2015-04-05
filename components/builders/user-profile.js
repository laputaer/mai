
/**
 * user-profile.js
 *
 * Render user profile body
 */

var containerTemplate = require('../templates/user/container');
var profileTemplate = require('../templates/user/profile');
var feedTemplate = require('../templates/user/feed');
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
	data.user_from = buttonTemplate({
		href: 'https://' + data.user.provider + '.com/' + data.user.login
		, icon: data.user.provider
		, text: data.i18n.t('user-profile.from')
		, version: data.version.asset
	})
	data.main = containerTemplate({
		profile: profileTemplate(data)
		, feed: feedTemplate(data)
	});

	return bodyBuilder(data);
};
