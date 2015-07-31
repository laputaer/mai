
/**
 * weibo-config.js
 *
 * Custom oauth provider: weibo
 */

module.exports = {
	"weibo": {
		"__provider": {
			"oauth2": true
		},
		"https://api.weibo.com": {
			"__domain": {
				"auth": {
					"qs": {"access_token": "[0]"}
				}
			},
			"[version]/{endpoint}.[type]": {
				"__path": {
					"alias": "__default",
					"version": "2"
				}
			}
		}
	}
};
