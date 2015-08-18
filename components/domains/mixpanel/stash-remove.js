
/**
 * stash-remove.js
 *
 * Report user stash item action
 */

module.exports = stashRemove;

/**
 * Send the stash item for reporting
 *
 * @param   Object  opts  { mixpanel, user, item, request }
 * @return  Void
 */
function stashRemove(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var item = opts.item;
	var request = opts.request;
	var now = new Date();

	mixpanel.track('Stash remove', {
		distinct_id: user
		, user: user
		, item: item
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user, {
		last_action: now.toISOString()
		, last_stash_remove: now.toISOString()
		, ip: request.ip
	});

	mixpanel.people.increment(
		user
		, 'stash_item_count'
		, -1
	);
};
