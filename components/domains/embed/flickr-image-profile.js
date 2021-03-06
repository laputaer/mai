
/**
 * flickr-image-profile.js (deprecated)
 *
 * Retrieve flickr image metadata
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
					return Promise.reject(new Error('provider returned non-2xx status code'));
				}

				return res.json();
			}).then(function(body) {
				if (!body || body.type !== 'photo') {
					return Promise.reject(new Error('provider returned non-oembed result'));
				}

				var is_cc = body.license_url && body.license_url.indexOf('creativecommons.org') >= 0;

				return {
					image: body.url
					, author: body.author_name
					, source: body.web_page
					, license: is_cc ? body.license_url : ''
					, license_name: is_cc ? 'Creative Commons' : ''
					, provider: body.provider_name
					, domain: body.provider_url
				};
			});
};
