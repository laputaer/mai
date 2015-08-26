
/**
 * match-app-token.js
 *
 * Match app token
 */

module.exports = matchAppToken;

/**
 * Match app token
 *
 * @param   Object   opts  Options { cache, uid, aid, token }
 * @return  Boolean
 */
function *matchAppToken(opts) {
	var cache = opts.cache;
	var uid = opts.uid;
	var aid = opts.aid;
	var token = opts.token;

	// STEP 1: find token
	var key = 'token:' + uid + ':' + aid;
	var exist = yield cache.get(key);

	if (!exist) {
		return false;
	}

	if (exist !== token) {
		return false;
	}

	return true;
};
