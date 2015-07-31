
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

	// TODO: refactor into a standalone template
	var title = data.page_title ? data.page_title + ' - ' : '';
	var description = data.page_description ? data.page_description : i18n.t('common.description');

	var og_title, og_url, og_image, og_type, og_site_name, og_description;
	var t_card, t_site, t_title, t_description, t_image;
	var vendor, prefetch_cdn, prefetch_gs, prefetch_gs_1, prefetch_gs_2;
	var csrf_token, inline_css, dev_css;

	var main_css_file = data.production ? '/assets/app.css' : '/dev/app.css';
	var main_js_file = data.production ? '/assets/app.js' : '/dev/app.js';

	if (data.page_opengraph) {
		og_title = $('meta', {
			property: 'og:title'
			, content: data.page_opengraph.title + ' - ' + i18n.t('common.title')
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
			, content: description
		});
		t_card = $('meta', {
			name: 'twitter:card'
			, content: 'summary'
		});
		t_site = $('meta', {
			name: 'twitter:site'
			, content: '@rubume'
		});
		t_title = $('meta', {
			name: 'twitter:title'
			, content: data.page_opengraph.title + ' - ' + i18n.t('common.title')
		});
		t_description = $('meta', {
			name: 'twitter:description'
			, content: description
		});
		t_image = $('meta', {
			name: 'twitter:image'
			, content: data.page_opengraph.image
		});
	}

	if (data.production) {
		vendor = $('script', {
			src: base_url + '/assets/vendor.js?' + data.version.js
			, async: 'async'
		});

		prefetch_cdn = $('link', {
			rel: 'dns-prefetch'
			, href: '//rubu-maihq.netdna-ssl.com'
		});

		prefetch_gs = $('link', {
			rel: 'dns-prefetch'
			, href: '//d1l6p2sc9645hc.cloudfront.net'
		});

		prefetch_gs_1 = $('link', {
			rel: 'dns-prefetch'
			, href: '//data.gosquared.com'
		});

		prefetch_gs_2 = $('link', {
			rel: 'dns-prefetch'
			, href: '//data2.gosquared.com'
		});

		inline_css = $('style', {
			innerHTML: data.inline_css
		});
	} else {
		dev_css = $('link', {
			rel: 'stylesheet'
			, href: base_url + '/dev/inline.css?' + data.version.js
		});
	}

	if (data.current_user) {
		csrf_token = $('meta', {
			name: 'mai:token'
			, content: data.current_user.csrf_token
		});
	}

	var headers = [
		$('meta', {
			charset: 'UTF-8'
		})
		, $('meta', {
			name: 'viewport'
			, content: 'width=device-width, initial-scale=1.0'
		})
		, $('meta', {
			name: 'referrer'
			, content: 'no-referrer'
		})
		, $('title', title + i18n.t('common.title'))
		, $('meta', {
			name: 'description'
			, content: description
		})
		, $('meta', {
			name: 'apple-mobile-web-app-capable'
			, content: 'yes'
		})
		, $('meta', {
			name: 'apple-mobile-web-app-title'
			, content: i18n.t('common.app-title')
		})
		, $('link', {
			rel: 'apple-touch-icon'
			, sizes: '180x180'
			, href: '/apple-touch-icon.png?' + data.version.asset
		})
		, $('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '192x192'
			, href: '/android-chrome.png?' + data.version.asset
		})
		, $('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '32x32'
			, href: '/favicon.png?' + data.version.asset
		})
		, dev_css
		, csrf_token
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
		, prefetch_cdn
		, prefetch_gs
		, prefetch_gs_1
		, prefetch_gs_2
		, inline_css
		, $('script#css-loader', {
			innerHTML: data.inline_js
				+ ';var l=document.getElementById("css-loader");'
				+ 'loadCSS("' + base_url + main_css_file + '?' + data.version.css + '", l);'
				+ 'loadCSS("' + base_url + '/fonts/webfont.v1.css?' + data.version.css + '", l);'
		})
		, $('noscript', [
			$('link', {
				rel: 'stylesheet'
				, href: base_url + main_css_file + '?' + data.version.css
			})
			, $('link', {
				rel: 'stylesheet'
				, href: base_url + '/fonts/webfont.css?' + data.version.css
			})
		])
		, $('script', {
			src: base_url + main_js_file + '?' + data.version.js
			, async: 'async'
		})
		, vendor
	];

	var head = $('head', headers);

	return head;
};
