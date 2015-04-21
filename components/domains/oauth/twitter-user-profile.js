
/**
 * twitter-user-profile.js
 *
 * Retrieve twitter user profile
 */

module.exports = getTwitterUserProfile;

/**
 * Get Twitter user profile
 *
 * @param   Object   client  RESTful client
 * @param   Object   opts    Addtional options
 * @return  Promise
 */
function getTwitterUserProfile(client, opts) {
	return new Promise(function(resolve, reject) {
		client.query()
			.get('account/verify_credentials')
			.auth(opts.access_token, opts.access_secret)
			.request(function(err, res, body) {
				if (err || (res.statusCode < 200 || res.statusCode >= 300)) {
					reject(new Error('remote server returns status code ' + res.statusCode));
					return;
				}

				resolve({
					id: body.id_str
					, name: body.name
					, login: body.screen_name
					, avatar: body.profile_image_url_https
				});
			});
	});
};
