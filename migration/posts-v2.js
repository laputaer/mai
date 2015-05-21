
/**
 * posts-v2.js
 *
 * Migration script for `posts` collection, rev.2
 */

var checkRev = require('./check-revision');
var updateRev = require('./update-revision');

module.exports = migration;

function *migration(db) {
	var opts = {
		revision: 2
		, name: 'posts'
	};

	// check revision
	var status = yield checkRev(db, opts);
	if (!status) {
		return;
	}

	// run migration
	var Target = db.col(opts.name);
	var posts = yield Target.find().select({
		og: 1
		, pid: 1
		, _id: 0
	});

	for (var i = 0; i < posts.length; i++) {
		var post = posts[i];
		if (post.og) {
			var embed = post.og;

			if (embed.image) {
				embed.image = embed.image.map(function(url) {
					return {
						url: url
					};
				});
			}

			console.log(embed);

			/*
			yield Target.update({
				pid: post.pid
			}, {
				embed: embed
			});
			*/
		}
	}

	// update revision
	//yield updateRev(db, opts);
};
