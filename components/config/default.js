
/**
 * default.js
 *
 * Default config, create custom.js to overwrite these settings
 */

module.exports = {
	server: {
		port: 8081
	}
	, mongodb: {
		server: '127.0.0.1'
		, port: 27017
		, user: ''
		, pass: ''
		, userdb: ''
		, replSet: ''
		, database: 'mai'
		, w: 1
	}
	, redis: {
		server: '127.0.0.1'
		, port: 6379
		, pass: ''
		, database: 0
	}
	, oauth: {
		server: {
			protocol: 'http'
			, host: '127.0.0.1:8081'
			, callback: '/callback'
		}
	}
	, cookies: {}
};
