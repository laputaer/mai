
/**
 * head.js
 *
 * Render <head> document
 */

var $ = require('./vdom');
var i18n = require('./i18n')();

module.exports = template;

function template(data) {
	var base_url = data.base_url;
	var title_text = data.page_title ? data.page_title : i18n.t('common.title');
	var description_text = data.page_description ? data.page_description : i18n.t('common.description');
	var main_css_file = data.production ? '/assets/app.css' : '/dev/app.css';
	var main_js_file = data.production ? '/assets/app.js' : '/dev/app.js';

	var charset = $('meta', {
		charset: 'UTF-8'
	});

	var viewport = $('meta', {
		name: 'viewport'
		, content: 'width=device-width, initial-scale=1.0'
	});

	var referrer = $('meta', {
		name: 'referrer'
		, content: 'no-referrer'
	});

	var title = $('title', title_text);

	var description = $('meta', {
		name: 'description'
		, content: description_text
	});

	var web_app = $('meta', {
		name: 'apple-mobile-web-app-capable'
		, content: 'yes'
	});

	var web_app_title = $('meta', {
		name: 'apple-mobile-web-app-title'
		, content: i18n.t('common.app-title')
	});

	var apple_icon = $('link', {
		rel: 'apple-touch-icon'
		, sizes: '180x180'
		, href: '/apple-touch-icon.png?' + data.version.asset
	});

	var android_icon = $('link', {
		rel: 'icon'
		, type: 'image/png'
		, sizes: '192x192'
		, href: '/android-chrome.png?' + data.version.asset
	});

	var favicon = $('link', {
		rel: 'icon'
		, type: 'image/png'
		, sizes: '32x32'
		, href: '/favicon.png?' + data.version.asset
	});

	var csrf_token;
	if (data.current_user) {
		csrf_token = $('meta', {
			name: 'mai:token'
			, content: data.current_user.csrf_token
		});
	}

	var og_title, og_url, og_image, og_type, og_site_name, og_description;
	var t_title, t_image, t_card, t_site, t_description;
	if (data.page_opengraph) {
		og_title = $('meta', {
			property: 'og:title'
			, content: data.page_opengraph.title
		});
		og_url = $('meta', {
			property: 'og:url'
			, content: data.page_opengraph.url
		});
		og_image = $('meta', {
			property: 'og:image'
			, content: data.page_opengraph.image
		});
		og_type = $('meta', {
			property: 'og:type'
			, content: 'website'
		});
		og_site_name = $('meta', {
			property: 'og:site_name'
			, content: i18n.t('common.title')
		});
		og_description = $('meta', {
			property: 'og:description'
			, content: description_text
		});
		t_title = $('meta', {
			name: 'twitter:title'
			, content: data.page_opengraph.title
		});
		t_image = $('meta', {
			name: 'twitter:image'
			, content: data.page_opengraph.image
		});
		t_card = $('meta', {
			name: 'twitter:card'
			, content: 'summary'
		});
		t_site = $('meta', {
			name: 'twitter:site'
			, content: '@rubume'
		});
		t_description = $('meta', {
			name: 'twitter:description'
			, content: description_text
		});
	}

	var prefetch_cdn, prefetch_gs, inline_css, vendor;
	if (data.production) {
		prefetch_cdn = $('link', {
			rel: 'dns-prefetch'
			, href: '//rubu-maihq.netdna-ssl.com'
		});

		prefetch_gs = $('link', {
			rel: 'dns-prefetch'
			, href: '//d1l6p2sc9645hc.cloudfront.net'
		});

		inline_css = $('style', {
			innerHTML: data.inline_css
		});

		vendor = $('script', {
			src: base_url + '/assets/vendor.js?' + data.version.js
			, async: 'async'
		});
	} else {
		inline_css = $('link', {
			rel: 'stylesheet'
			, href: base_url + '/dev/inline.css?' + data.version.js
		});
	}

	var inline_js = $('script#css-loader', {
		innerHTML: data.inline_js
			+ ';var l=document.getElementById("css-loader");'
			+ 'loadCSS("' + base_url + main_css_file + '?' + data.version.css + '", l);'
			+ 'loadCSS("' + base_url + '/fonts/webfont.v1.css?' + data.version.css + '", l);'
	});

	var noscript = $('noscript', [
		$('link', {
			rel: 'stylesheet'
			, href: base_url + main_css_file + '?' + data.version.css
		})
		, $('link', {
			rel: 'stylesheet'
			, href: base_url + '/fonts/webfont.css?' + data.version.css
		})
	]);

	var main_js = $('script', {
		src: base_url + main_js_file + '?' + data.version.js
		, async: 'async'
	});

	var headers = [
		// common
		charset
		, viewport
		, referrer
		, title
		, description
		, web_app
		, web_app_title
		, apple_icon
		, android_icon
		, favicon
		// user only
		, csrf_token
		// club and user profile only
		, og_title
		, og_url
		, og_image
		, og_type
		, og_site_name
		, og_description
		, t_card
		, t_site
		, t_title
		, t_description
		, t_image
		// production only
		, prefetch_cdn
		, prefetch_gs
		, inline_css
		, inline_js
		, noscript
		, main_js
		, vendor
	];

	var head = $('head', headers);

	return head;
};
