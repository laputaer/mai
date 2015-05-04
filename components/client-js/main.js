
/**
 * main.js
 *
 * Client-side app
 */

'use strict';

var raf = require('raf');

var patcher = require('./view/patcher');

var renderer = function() {
	return '<h1>' + Date.now() + '</h1>';
};

raf(function loop() {
	patcher(document.body, renderer());
	raf(loop);
});
