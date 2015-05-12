
/**
 * github-user-profile.js
 *
 * Retrieve github user profile
 */

module.exports = getGithubUserProfile;

/**
 * Get Github user profile
 *
 * @param   Object   client  RESTful client
 * @param   Object   opts    Addtional options
 * @return  Promise
 */
function getGithubUserProfile(client, opts) {
	return new Promise(function(resolve, reject) {
		client.query()
			.get('user')
			.auth(opts.access_token)
			.request(function(err, res, body) {
				if (err) {
					reject(new Error('unable to contact remote server, reason: ' + err.message));
					return;
				}

				if (res && (res.statusCode < 200 || res.statusCode >= 300)) {
					reject(new Error('remote server returns status code ' + res.statusCode));
					return;
				}

				resolve({
					id: body.id.toString()
					, name: body.name
					, login: body.login
					, avatar: body.avatar_url
				});
			});
	});
};
