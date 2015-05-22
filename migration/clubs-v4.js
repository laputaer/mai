
/**
 * clubs-v4.js
 *
 * Migration script for `clubs` collection, rev.4
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 4
		, name: 'clubs'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	var clubs = yield Target.find().select({
		oembed: 1
		, slug: 1
		, _id: 0
	});

	for (var i = 0; i < clubs.length; i++) {
		var club = clubs[i];
		if (club.oembed) {
			var oembed = club.oembed;
			var embed = {};

			embed.title = 'unknown';
			embed.url = oembed.source;
			embed.site_name = oembed.provider;
			embed.image = [{
				url: oembed.image
			}];

			yield Target.update({
				slug: club.slug
			}, {
				embed: embed
			});
		}
	}

	// update revision
	yield updateRev(db, opts);
};
