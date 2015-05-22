
/**
 * head.js
 *
 * Render <head> document
 */

var h = require('virtual-dom/h');

module.exports = template;

function template(data) {
	var i18n = data.i18n;
	var xss = data.xss;

	var title = data.page_title ? xss.data(data.page_title) + ' | ' : '';
	var description = data.page_description ? xss.attr(data.page_description) : i18n.t('common.description');

	var og_title, og_url, og_image, og_type, og_site_name, og_description;
	var t_card, t_site, t_title, t_description, t_image;
	if (data.page_opengraph) {
		og_title = h('meta', {
			property: 'og:title'
			, content: xss.attr(data.page_opengraph.title) + ' | ' + i18n.t('common.title')
		});
		og_url = h('meta', {
			property: 'og:url'
			, content: xss.url(data.page_opengraph.url)
		});
		og_image = h('meta', {
			property: 'og:image'
			, content: data.page_opengraph.image
		});
		og_type = h('meta', {
			property: 'og:type'
			, content: 'website'
		});
		og_site_name = h('meta', {
			property: 'og:site_name'
			, content: i18n.t('common.title')
		});
		og_description = h('meta', {
			property: 'og:description'
			, content: description
		});
		t_card = h('meta', {
			name: 'twitter:card'
			, content: 'summary'
		});
		t_site = h('meta', {
			name: 'twitter:site'
			, content: '@bitinn'
		});
		t_title = h('meta', {
			name: 'twitter:title'
			, content: xss.attr(data.page_opengraph.title) + ' | ' + i18n.t('common.title')
		});
		t_description = h('meta', {
			name: 'twitter:description'
			, content: description
		});
		t_image = h('meta', {
			name: 'twitter:image'
			, content: data.page_opengraph.image
		});
	}

	var head = [
		h('meta', {
			charset: 'UTF-8'
		})
		, h('meta', {
			name: 'viewport'
			, content: 'width=device-width, initial-scale=1.0'
		})
		, h('meta', {
			name: 'referrer'
			, content: 'no-referrer'
		})
		, h('title', title + i18n.t('common.title'))
		, h('meta', {
			name: 'description'
			, content: description
		})
		, h('meta', {
			name: 'apple-mobile-web-app-title'
			, content: i18n.t('common.app-title')
		})
		, h('link', {
			rel: 'apple-touch-icon'
			, sizes: '180x180'
			, href: '/apple-touch-icon.png?' + data.version.asset
		})
		, h('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '192x192'
			, href: '/android-chrome.png?' + data.version.asset
		})
		, h('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '32x32'
			, href: '/favicon.png?' + data.version.asset
		})
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
		, h('link', {
			rel: 'stylesheet'
			, href: '/assets/app.css?' + data.version.css
		})
		, h('script', {
			src: '/assets/app.js?' + data.version.js
			, async: 'async'
		})
	];

	return head;
};
