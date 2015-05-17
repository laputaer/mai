
/**
 * get-open-graph-profile.js
 *
 * Load and parse opengraph meta
 */

var fetch = require('node-fetch');
var cheerio = require('cheerio');
var attrs = require('./open-graph-attributes');

module.exports = getOpenGraphProfile;

/**
 * Get opengraph metadata
 *
 * @param   Object   opts  Request options
 * @return  Promise
 */
function getOpenGraphProfile(opts) {
	var url = opts.url;

	return fetch(url, {
		headers: {
			'User-Agent': opts.user_agent
		}
		, follow: opts.follow
		, timeout: opts.timeout
		, size: opts.size
	}).then(function(res) {
		if (!res.ok) {
			return Promise.reject(new Error('provider returned non-2xx status code'));
		}

		return res.text();
	}).then(function(body) {
		if (!body) {
			return Promise.reject(new Error('provider returned empty body'));
		}

		// extract opengraph meta tags
		var d = cheerio.load(body, {
			normalizeWhitespace: true
			, decodeEntities: false
		});
		var meta = d('meta[property^="og:"]');
		var temp = {
			root: false
			, group: {}
		};
		var og = {};

		// run through tags and compose opengraph object
		meta.each(function(index) {
			var key = d(this).attr('property');
			var value = d(this).attr('content');
			var known = attrs[key.replace('og:', '')];

			// unknown property, ignore it
			if (!known) {
				return;
			}

			// basic property, set it
			if (!known.group) {
				og[known.field] = value;
				return;
			}

			// prepare for structured properties
			if (!og[known.group]) {
				og[known.group] = [];
			}

			// every time we see root property
			if (known.root) {
				// exist temp group will be pushed onto opengraph object
				if (temp.root) {
					og[temp.root].push(temp.group);
				}

				// reset the temp group
				temp.root = known.group;
				temp.group = {};
				temp.group[known.field] = value;
				return;
			}

			// every time we see non-root property, when temp group exists, set it
			if (!known.root && temp.root) {
				temp.group[known.field] = value;
			}
		});

		// push last temp group to opengraph object
		if (temp.root) {
			og[temp.root].push(temp.group);
		}

		return og;
	});
};
