
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
		, twitter: {
			key: 'nxOx6Y7lpmN4e4V99L0bw'
			, secret: '4nZX1am59WcgB0PAy0LYDCHdXytEDZOmGWvMoiWtk'
		}
		, github: {
			key: 'a6fea3770028d383d712'
			, secret: '3e1bfca8ffdbd7155fed6964e71281266b7eeafb'
		}
	}
	, cookies: {
		key: '2($<`)te+(CX,lm5LtRg6V3}c<|938_vO>%|OD~|2$?<6 -s-!p!ZVj0#.Ib<bon'
	}
};
