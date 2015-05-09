
/**
 * cache.js
 *
 * Export cache domain model
 */

var readFile = require('./cache/read-file');
var writeFile = require('./cache/write-file');

module.exports = {
	readFile: readFile
	, writeFile: writeFile
};
