
/**
 * write-file.js
 *
 * Write a file, overwrite if exist
 */

var fs = require('fs');

module.exports = writeFile;

/**
 * Write file by path
 *
 * @param   String   path  File path
 * @return  Promise
 */
function *writeFile(path) {
	return new Promise(function(resolve, reject) {
		console.log(path);
		var file = fs.createWriteStream(path);

		file.on('error', function(err) {
			reject(err);
		});

		file.on('open', function() {
			resolve(file);
		});
	});
};
