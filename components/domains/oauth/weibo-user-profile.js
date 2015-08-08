
/**
 * weibo-user-profile.js
 *
 * Retrieve weibo user profile
 */

module.exports = getWeiboUserProfile;

/**
 * Get weibo user profile
 *
 * @param   Object   client  RESTful client
 * @param   Object   opts    Addtional options
 * @return  Promise
 */
function getWeiboUserProfile(client, opts) {
	return new Promise(function(resolve, reject) {
		client.query()
			.get('users/show')
			.auth(opts.access_token)
			.where({ uid: opts.uid })
			.request(function(err, res, body) {
				if (err) {
					reject(new Error('unable to contact remote server, reason: ' + err.error));
					return;
				}

				if (res && (res.statusCode < 200 || res.statusCode >= 300)) {
					reject(new Error('remote server returns status code ' + res.statusCode));
					return;
				}

				resolve({
					id: body.idstr
					, name: body.screen_name || body.name || body.idstr
					, login: body.domain || body.idstr
					, avatar: body.avatar_hd || body.avatar_large
				});
			});
	});
};
