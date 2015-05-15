
/**
 * twitter-content-profile.js
 *
 * Retrieve twitter content metadata
 */

var fetch = require('node-fetch');
var cheerio = require('cheerio');

module.exports = getTwitterContentProfile;

/**
 * Get twitter oembed metadata
 *
 * @param   Object   opts  Request options
 * @return  Promise
 */
function getTwitterContentProfile(opts) {
	var url = 'https://api.twitter.com/1/statuses/oembed.json?omit_script=1&url=' + encodeURIComponent(opts.url);

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
				if (!body || body.type !== 'rich') {
					return Promise.reject(new Error('provider returned non-oembed result'));
				}

				var dom = cheerio.load(body.html, {
					normalizeWhitespace: true
					, decodeEntities: false
				});

				return {
					content: dom('p').html()
					, author: body.author_name
					, profile: body.author_url
					, source: body.url
					, provider: body.provider_name
					, domain: body.provider_url
				};
			});
};
