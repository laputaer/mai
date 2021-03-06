
/**
 * toggle-body-scroll.js
 *
 * Cancel body scroll when in a modal
 */

'use strict';

// ref: http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40, 32, 33, 34, 35, 36];
var win = window;
var doc = document;

module.exports = toggleScroll;

/**
 * Prevent default action
 *
 * @param   Boolean  flag  Toggle scroller
 * @return  Void
 */
function toggleScroll(flag) {
	if (flag) {
		enableScroll();
	} else {
		disableScroll();
	}
};

/**
 * Disable scroll
 *
 * @return  Void
 */
function disableScroll() {
	win.addEventListener('wheel', preventDefault);
	win.addEventListener('touchmove', preventDefault);
	doc.addEventListener('keydown', preventDefaultForScrollKeys);
};

/**
 * Enable scroll
 *
 * @return  Void
 */
function enableScroll() {
	win.removeEventListener('wheel', preventDefault);
	win.removeEventListener('touchmove', preventDefault);
	doc.removeEventListener('keydown', preventDefaultForScrollKeys);
};

/**
 * Prevent keyboard action
 *
 * @return  Void
 */
function preventDefaultForScrollKeys(e) {
	if (keys.indexOf(e.keyCode) > -1) {
		preventDefault(e);
	}
};

/**
 * Prevent default action
 *
 * @return  Void
 */
function preventDefault(e) {
	e = e || win.event;

	if (e.preventDefault) {
		e.preventDefault();
	}
};
