
/**
 * read-file.js
 *
 * Get a file if exist
 */

var fs = require('fs');

module.exports = readFile;

/**
 * Get file by path
 *
 * @param   String   path  File path
 * @return  Promise
 */
function *readFile(path) {
	return new Promise(function(resolve, reject) {
		var file = fs.createReadStream(path);

		file.on('error', function(err) {
			reject(err);
		});

		file.on('open', function() {
			resolve(file);
		});
	});
};
