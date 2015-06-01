
/**
 * opengraph.js
 *
 * OpenGraph object transform function
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
	// title: trim, decode, shorten or create one
	if (input.title) {
		input.title = input.title.trim();

		input.title = he.decode(input.title, {
			isAttributeValue: true
		});

		if (input.title.length > 128) {
			input.title = input.title.substr(0, 120) + '...';
		}
	} else {
		input.title = 'unknown title';
	}

	// url: trim, decode
	if (input.url) {
		input.url = input.url.trim();

		input.url = he.decode(input.url, {
			isAttributeValue: true
		});
	}

	// site_name: trim, decode, shorten or create one
	if (input.site_name) {
		input.site_name = input.site_name.trim();

		input.site_name = he.decode(input.site_name, {
			isAttributeValue: true
		});

		if (input.site_name.length > 64) {
			input.site_name = input.site_name.substr(0, 60) + '...';
		}
	} else if (input.url) {
		var url = parser(input.url);
		input.site_name = url.hostname;
	}

	// description: trim, decode, normalize whitespace, shorten
	if (input.description) {
		input.description = input.description.trim();

		input.description = he.decode(input.description, {
			isAttributeValue: true
		});

		input.description = input.description.replace(/\s/g, ' ');

		if (input.description.length > 1020) {
			input.description = input.description.substr(0, 1020) + '...';
		}
	}

	// image: mediaTranform
	if (input.image) {
		input.image = input.image.map(function(item) {
			return mediaTranform(item, input.url);
		});
	}

	// video: mediaTranform
	if (input.video) {
		input.video = input.video.map(function(item) {
			return mediaTranform(item, input.url);
		});
	}

	// audio: mediaTranform
	if (input.audio) {
		input.audio = input.audio.map(function(item) {
			return mediaTranform(item, input.url);
		});
	}

	return input;
};

/**
 * Transform media object
 *
 * @param   Object  input  Media object
 * @param   String  base   Source url
 * @return  Object         Transformed media object
 */
function mediaTranform(input, url) {
	// trim, normalize whitespace, decode
	if (input.url) {
		input.url = input.url.trim();

		input.url = input.url.replace(/\s/g, '%20');

		input.url = he.decode(input.url, {
			isAttributeValue: true
		});

		if (url && input.url.substr(0, 4) !== 'http') {
			input.url = resolver(url, input.url);
		}
	}

	if (input.secure_url) {
		input.secure_url = input.secure_url.trim();

		input.secure_url = input.secure_url.replace(/\s/g, '%20');

		input.secure_url = he.decode(input.secure_url, {
			isAttributeValue: true
		});

		if (url && input.secure_url.substr(0, 5) !== 'https') {
			input.secure_url = resolver(url, input.secure_url);
		}
	}

	return input;
};
