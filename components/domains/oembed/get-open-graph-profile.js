
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
			}).then(function(res) {
				if (!res.ok) {
					return Promise.reject(new Error('provider returned non-2xx status code'));
				}

				return res.text();
			}).then(function(body) {
				if (!body) {
					return Promise.reject(new Error('provider returned non-html result'));
				}

				var d = cheerio.load(body, {
					normalizeWhitespace: true
					, decodeEntities: false
				});
				var meta = d('meta[property^="og:"]');
				var temp = {};
				var og = {};

				meta.each(function() {
					var key = d(this).attr('property');
					var val = d(this).attr('content');
					var known = attrs[key.replace('og:', '')];

					// unknown field, ignore
					if (!known) {
						return;
					}

					// single value, set
					if (!known.group) {
						og[known.field] = val;
						return;
					}

					// non-root group value, set
					if (!known.root) {
						temp[known.field] = val;
						return;
					}

					// root group value, 1st group, set
					if (!temp.group) {
						temp = {};
						temp.group = known.group;
						temp[known.field] = val;
						return;
					}

					// root group, not 1st group, push temp
					var group = temp.group;
					delete temp.group;

					if (!og[group]) {
						og[group] = [];
					}

					og[group].push(temp);

					// prepare new group, set
					temp = {};
					temp.group = known.group;
					temp[known.field] = val;
				});

				// push last temp
				if (temp.group) {
					var group = temp.group;
					delete temp.group;

					if (!og[group]) {
						og[group] = [];
					}

					og[group].push(temp);
				}

				return og;
			});
};
