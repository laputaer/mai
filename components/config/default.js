
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
		user_agent: 'Rubu/2.0 (+http://rubu.me/)'
		, follow: 5
		, timeout: 1000 * 10
		, size: 1000 * 1000 * 10
	}
	, session: {
		key: 'rubu:session'
		, signed: true
		, maxAge: 1000 * 60 * 60 * 24 * 30
	}
	, version: {
		css: 'v1.0.18'
		, js: 'v1.0.18'
		, asset: 'v1.0.18'
	}
	, output: {
		format: false
	}
	, flash: {
		key: 'flash-message'
	}
	, proxy: {
		sizes: ['20', '40', '60', '80', '100', '200', '400', '600', '800']
	}
	, analytics: {}
	, fake_ua: {
		'pixiv.net': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
	}
	, fake_url: {
		'pixiv.net': {
			target: '150x150'
			, replaced: '600x600'
		}
	}
	, fake_referer: {
		'anim-babblers.com': 'http://anim-babblers.com/'
	}
	, fake_fetch_ua: {
		'www.toranoana.jp': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
	}
	, showcase: {}
};
