
/**
 * flickr-image-profile.js
 *
 * Retrieve github user profile
 */

var fetch = require('node-fetch');

module.exports = getFlickrImageProfile;

/**
 * Get flickr oembed metadata
 *
 * @param   Object   opts  Request options
 * @return  Promise
 */
function getFlickrImageProfile(opts) {
	var url = 'https://www.flickr.com/services/oembed.json?url=' + encodeURIComponent(opts.url);

	return fetch(url, {
				headers: {
					'User-Agent': opts.user_agent
				}
				, follow: opts.follow
				, timeout: opts.timeout
			}).then(function(res) {
				if (!res.ok) {
					return;
				}

				return res.json();
			}).then(function(body) {
				if (!body || body.type !== 'photo') {
					return;
				}

				return {
					image: body.url
					, author: body.author_name
					, source: body.web_page
					, license: body.license_url || undefined
					, provider: body.provider_name
					, domain: body.provider_url
				};
			});
};
