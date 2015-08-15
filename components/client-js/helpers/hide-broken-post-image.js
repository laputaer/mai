
/**
 * hide-broken-post-image.js
 *
 * Hide broken image under post view
 */

'use strict';

module.exports = hideImage;

/**
 * Handle image load error
 *
 * @param   Object  ev  Event object
 * @return  Void
 */
function hideImage(ev) {
	var img = ev.target;
	var div = img.parentNode;

	if (!div.classList.contains('image-column')) {
		return;
	}

	if (div.classList.contains('hidden')) {
		return;
	}

	if (!img.onerror) {
		console.log('attach');

		img.onerror = function () {
			div.classList.add('hidden');
			img.onerror = null;
			img.onload = null;
			console.log('error');
		};

		img.onload = function () {
			img.onerror = null;
			img.onload = null;
			console.log('load');
		};
	}
};
