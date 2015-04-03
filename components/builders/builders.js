
/**
 * builders.js
 *
 * Available template builders
 */

var doc = require('./doc');
var landing = require('./landing');
var home = require('./home');
var error = require('./error');

module.exports = {
	doc: doc
	, landing: landing
	, home: home
	, error: error
};
