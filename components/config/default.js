
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
		, follow: 5
		, timeout: 1000 * 10
		, size: 1000 * 1000 * 10
	}
	, session: {
		key: 'mai:session'
		, signed: true
		, maxAge: 1000 * 60 * 60 * 24 * 30
	}
	, version: {
		css: 'v1.0.10'
		, js: 'v1.0.10'
		, asset: 'v1.0.10'
	}
	, output: {
		format: true
	}
	, flash: {
		key: 'flash-message'
	}
	, proxy: {
		sizes: ['20', '40', '60', '80', '100', '200', '400', '600', '800']
	}
	, fake_ua: {
		'pixiv.net': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
	}
	, fake_url: {
		'pixiv.net': {
			target: '150x150'
			, result: '600x600'
		}
	}
	, fake_referer: {
		'anim-babblers.com': 'http://anim-babblers.com/'
	}
};
