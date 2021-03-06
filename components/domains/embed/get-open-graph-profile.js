
/**
 * get-open-graph-profile.js
 *
 * Load and parse opengraph meta
 */

var resolver = require('url').resolve;
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var attrs = require('./open-graph-attributes');
var getMainContent = require('./get-main-content');

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
		var $ = cheerio.load(body, {
			normalizeWhitespace: true
			, decodeEntities: false
		});
		var title = $('title').first().text();
		var meta = $('meta[property^="og:"]');
		var temp = {
			root: false
			, group: {}
		};
		var og = {};
		var node, preview, cache_size;

		// case 1: no opengraph data, try to build an opengraph compatible object
		if (meta.length === 0) {
			og.title = title;
			og.url = url;
			og.type = 'fallback';
			og.description = $('meta[name="description"]').first().attr('content');

			node = getMainContent($);

			// detect the main image and description
			if (node) {
				og.description = node.text().substr(0, 100) + '...';

				preview = node.find('img').first().attr('src');
			}

			// fallback to touch icon
			if (!preview) {
				cache_size = 0;
				$('link[rel^="apple-touch-icon"]').each(function(index, link) {
					var el = $(link);
					var sizes = el.attr('sizes') || '';

					if (!sizes) {
						preview = el.attr('href');
						return;
					}

					var size = parseInt(sizes.split('x')[0], 10);

					if (size > cache_size) {
						preview = el.attr('href');
						cache_size = size;
					}
				});
			}

			// make sure this is an absolute url
			if (preview) {
				preview = resolver(url, preview);

				og.image = [{
					url: preview
				}];
			}

			return og;
		}

		// case 2: opengraph data found, run through meta and compose opengraph object
		meta.each(function() {
			var key = $(this).attr('property');
			var value = $(this).attr('content');
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

		// og:url missing or not absolute, we append input url to opengraph object
		if (!og.url) {
			og.url = url;
		} else if (og.url.substr(0, 4) !== 'http') {
			og.url = url;
		}

		// og:title missing, we append title to opengraph object
		if (!og.title) {
			og.title = title;
		}

		// og:type missing, we default to website
		if (!og.type) {
			og.type = 'website';
		}

		return og;
	});
};
