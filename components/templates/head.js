
/**
 * head.js
 *
 * Render <head> document
 */

var $ = require('./vdom');
var i18n = require('./i18n')();

// ref: http://stackoverflow.com/questions/24070515/rendering-or-deleting-emoji
var re = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;

module.exports = template;

function template(data) {
	var base_url = data.base_url;
	var current_path = data.current_path;
	var site_url = data.site_url;
	var main_css_file = data.production ? '/assets/app.css' : '/dev/app.css';
	var main_js_file = data.production ? '/assets/app.js' : '/dev/app.js';
	var profile = data.club_profile || data.user_profile || null;
	var title_text = i18n.t('common.title');
	var description_text = i18n.t('common.description');
	var profile_image = base_url + '/images/header-640.jpg';

	if (profile) {
		title_text = profile.title || profile.name || title_text;
		description_text = profile.intro || description_text;
		if (profile.image) {
			profile_image = profile.image + '&size=ls-medium';
		} else if (profile.avatar) {
			profile_image = profile.avatar + '&size=ls-medium';
		}
	}

	var title_text_attribute = title_text.replace(re, '-');
	var description_text_attribute = description_text.replace(re, '-');
	var site_name_attribute = i18n.t('common.title').replace(re, '-');

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

	var error_status;
	if (data.error_status && data.error_message) {
		error_status = $('meta', {
			name: 'mai:error'
			, content: data.error_status + '_' + data.error_message
		});
	}

	var csrf_token;
	if (data.current_user) {
		csrf_token = $('meta', {
			name: 'mai:token'
			, content: data.current_user.csrf_token
		});
	}

	var og_title = $('meta', {
		property: 'og:title'
		, content: title_text_attribute
	});

	var og_url = $('meta', {
		property: 'og:url'
		, content: site_url + current_path
	});

	var og_image = $('meta', {
		property: 'og:image'
		, content: profile_image
	});

	var og_type = $('meta', {
		property: 'og:type'
		, content: 'website'
	});

	var og_site_name = $('meta', {
		property: 'og:site_name'
		, content: site_name_attribute
	});

	var og_description = $('meta', {
		property: 'og:description'
		, content: description_text_attribute
	});

	var t_title = $('meta', {
		name: 'twitter:title'
		, content: title_text_attribute
	});

	var t_image = $('meta', {
		name: 'twitter:image'
		, content: profile_image
	});

	var t_card = $('meta', {
		name: 'twitter:card'
		, content: 'summary'
	});

	var t_site = $('meta', {
		name: 'twitter:site'
		, content: '@rubume'
	});

	var t_description = $('meta', {
		name: 'twitter:description'
		, content: description_text_attribute
	});

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
			, href: base_url + '/fonts/webfont.v1.css?' + data.version.css
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
		// error page only
		, error_status
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
