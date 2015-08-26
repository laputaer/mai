
/**
 * stash-item.js
 *
 * Stash item object transform function
 */

var he = require('he');
var parser = require('url').parse;
var resolver = require('url').resolve;

module.exports = tranform;

/**
 * Transform input object
 *
 * @param   Object  input  Input object
 * @return  Object         Transformed input object
 */
function tranform(input) {
	// url: trim, decode
	if (input.url) {
		input.url = input.url.trim();

		input.url = he.decode(input.url, {
			isAttributeValue: true
		});
	}

	// title: trim, decode, shorten or create one
	if (input.title) {
		input.title = input.title.trim();

		input.title = he.decode(input.title, {
			isAttributeValue: true
		});

		if (input.title.length > 128) {
			input.title = input.title.substr(0, 120) + '...';
		}
	}

	// favicon: trim, decode
	if (input.favicon) {
		input.favicon = input.favicon.trim();

		input.favicon = he.decode(input.favicon, {
			isAttributeValue: true
		});
	}

	return input;
};
