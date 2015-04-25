
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
			, callback: '/login'
			, transport: 'session'
			, state: true
		}
	}
	, cookies: {}
	, request: {
		user_agent: 'Mai/1.0 (+http://mai3.me/)'
	}
	, session: {
		key: 'mai:session'
		, signed: true
		, maxAge: 1000 * 60 * 60 * 24 * 30
	}
	, version: {
		css: 'v1.0.4'
		, js: 'v1.0.0'
		, asset: 'v1.0.1'
	}
	, output: {
		format: true
	}
	, flash: {
		key: 'flash-message'
	}
};
