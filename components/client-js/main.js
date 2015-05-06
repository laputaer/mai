
/**
 * main.js
 *
 * Client-side app
 */

'use strict';

var Renderer = require('./renderer');
var pageRenderer = new Renderer();

window.addEventListener('DOMContentLoaded', init);

function init() {
	var page = document.getElementsByClassName('page')[0];
	pageRenderer.init(page);
};

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
