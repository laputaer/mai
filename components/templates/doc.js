
/**
 * doc.js
 *
 * Render <html> document
 */

var h = require('virtual-dom/h');

module.exports = template;

function template(data) {
	var i18n = data.i18n;
	var head = h('head', [
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
		, h('title', i18n.t('common.title'))
		, h('meta', {
			name: 'description'
			, content: i18n.t('common.description')
		})
		, h('link', {
			rel: 'apple-touch-icon'
			, sizes: '180x180'
			, href: '/apple-touch-icon.png'
		})
		, h('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '192x192'
			, href: '/android-chrome.png'
		})
		, h('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '32x32'
			, href: '/favicon.png'
		})
		, h('link', {
			rel: 'stylesheet'
			, href: '/assets/app.css?' + data.version.css
		})
		, h('script', {
			src: '/assets/app.js?' + data.version.js
		})
	]);

	var body = h('body', data.body);

	var html = h('html', {
		lang: 'zh'
	}, [head, body]);

	return html;
};
