
/**
 * main.js
 *
 * Client-side app
 */

'use strict';

var Renderer = require('./renderer');
var page = new Renderer();

console.log('pre-fire');
setTimeout(function() {
	page.init(document.body.firstChild);
	console.log('fired');
}, 2000);

setTimeout(function() {
	page.update();
	console.log('fired 2');
}, 4000);

/*
var raf = require('raf');

var patcher = require('./patcher');

var renderer = function() {
	return '<h1>' + Date.now() + '</h1>';
};

raf(function loop() {
	patcher(document.body, renderer());
	raf(loop);
});
*/
