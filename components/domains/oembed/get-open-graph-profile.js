
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

				var d = cheerio.load(body, {
					normalizeWhitespace: true
					, decodeEntities: false
				});
				var meta = d('meta[property^="og:"]');
				var total = meta.length - 1;
				var temp = {};
				var og = {};

				meta.each(function(index) {
					var key = d(this).attr('property');
					var val = d(this).attr('content');
					var known = attrs[key.replace('og:', '')];

					// for last run, push final group to output
					if (index === total && temp.group) {
						var group = temp.group;
						delete temp.group;
						og[group].push(temp);
					}

					// unknown field, ignore
					if (!known) {
						return;
					}

					// single value, set
					if (!known.group) {
						og[known.field] = val;
						return;
					}

					// init group
					if (!og[known.group]) {
						og[known.group] = [];
					}

					// no current group, set
					if (!temp.group) {
						temp = {};
						temp.group = known.group;
						temp[known.field] = val;
						return;
					}

					// non-root group value, same as current group, set
					if (!known.root && known.group === temp.group) {
						temp[known.field] = val;
						return;
					}

					// root group value or different group value, push and set
					if (known.root || known.group !== temp.group) {
						var group = temp.group;
						delete temp.group;
						og[group].push(temp);

						temp = {};
						temp.group = known.group;
						temp[known.field] = val;
					}
				});

				return og;
			});
};
