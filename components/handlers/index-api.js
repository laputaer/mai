
/**
 * index-api.js
 *
 * Group handlers together for router
 */

module.exports = {
	getCurrentUser: require('./api-current-user')
	, getGlobalConfig: require('./api-global-config')
};
