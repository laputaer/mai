
/**
 * opengraph.js
 *
 * OpenGraph object transform function
 */

var he = require('he');
var parser = require('url').parse;

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

	// image: trim, normalize whitespace, decode
	if (input.image) {
		input.image = input.image.map(function(image) {
			if (image.url) {
				image.url = image.url.trim();

				image.url = image.url.replace(/\s/g, '%20');

				image.url = he.decode(image.url, {
					isAttributeValue: true
				});
			}

			if (image.secure_url) {
				image.secure_url = image.secure_url.trim();

				image.secure_url = image.secure_url.replace(/\s/g, '%20');

				image.secure_url = he.decode(image.secure_url, {
					isAttributeValue: true
				});
			}

			return image;
		});
	}

	// video: trim, normalize whitespace, decode
	if (input.video) {
		input.video = input.video.map(function(video) {
			if (video.url) {
				video.url = video.url.trim();

				video.url = video.url.replace(/\s/g, '%20');

				video.url = he.decode(video.url, {
					isAttributeValue: true
				});
			}

			if (video.secure_url) {
				video.secure_url = video.secure_url.trim();

				video.secure_url = video.secure_url.replace(/\s/g, '%20');

				video.secure_url = he.decode(video.secure_url, {
					isAttributeValue: true
				});
			}

			return video;
		});
	}

	// audio: trim, normalize whitespace, decode
	if (input.audio) {
		input.audio = input.audio.map(function(audio) {
			if (audio.url) {
				audio.url = audio.url.trim();

				audio.url = audio.url.replace(/\s/g, '%20');

				audio.url = he.decode(audio.url, {
					isAttributeValue: true
				});
			}

			if (audio.secure_url) {
				audio.secure_url = audio.secure_url.trim();

				audio.secure_url = audio.secure_url.replace(/\s/g, '%20');

				audio.secure_url = he.decode(audio.secure_url, {
					isAttributeValue: true
				});
			}

			return audio;
		});
	}

	return input;
};
