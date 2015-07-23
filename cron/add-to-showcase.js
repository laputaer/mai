
/**
 * add-to-showcase.js
 *
 * Standalone script to manage showcase list
 */

var co = require('co');
var argv = require('minimist')(process.argv.slice(2));
var mongodb = require('../components/db/mongodb');
var configFactory = require('../components/config/config');

function *cron() {
	console.log('cron started');

	if (argv._.length !== 2) {
		console.log('type and id input missing');
		return;
	}

	var input = argv._;

	// prepare database connection
	var config = configFactory();
	var db = yield mongodb(config.mongodb);

	var Showcase = db.col('showcase');

	// get the feature doc
	var feature = yield Showcase.findOne({
		type: input[0]
	});

	if (!feature) {
		console.log('feature doc not found');
		return;
	}

	// push new id and trim the list
	var list = feature.list;
	var pos = list.indexOf(input[1]);

	if (pos !== -1) {
		console.log('feature item already added');
		return;
	}

	list.unshift(input[1]);
	list = list.slice(0, feature.limit);

	// update feature doc
	yield Showcase.update({
		type: input[0]
	}, {
		list: list
	});

	console.log('added ' + input[1] + ' to ' + input[0] + ' list');
};

co(cron).then(function() {
	console.log('cron done');
	process.exit();
}).catch(function(err) {
	console.error(err.stack);
	process.exit();
});
