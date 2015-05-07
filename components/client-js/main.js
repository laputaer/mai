
/**
 * main.js
 *
 * Client-side app
 */

'use strict';

var Renderer = require('./renderer');
var page = new Renderer();

window.addEventListener('DOMContentLoaded', init);

function init() {
	page.init(document.getElementsByClassName('page')[0]);

	setTimeout(function () {
		page.update();
	}, 1000);
}
