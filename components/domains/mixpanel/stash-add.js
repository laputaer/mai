
/**
 * stash-add.js
 *
 * Report user stash item action
 */

module.exports = stashAdd;

/**
 * Send the stash item for reporting
 *
 * @param   Object  opts  { mixpanel, user, item, request, type }
 * @return  Void
 */
function stashAdd(opts) {
	var mixpanel = opts.mixpanel;
	var user = opts.user;
	var item = opts.item;
	var type = opts.type;
	var request = opts.request;
	var now = new Date();

	mixpanel.track('Stash add', {
		distinct_id: user
		, user: user
		, item: item
		, type: type
		, source: 'server'
		, ip: request.ip
	});

	mixpanel.people.set(user, {
		last_action: now.toISOString()
		, last_stash_add: now.toISOString()
		, ip: request.ip
	});

	mixpanel.people.increment(
		user
		, 'stash_item_count'
		, 1
	);
};
