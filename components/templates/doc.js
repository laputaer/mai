
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
		, h('link', {
			rel: 'apple-touch-icon'
			, href: '/favicon.png'
		})
		, h('link', {
			rel: 'icon'
			, type: 'image/png'
			, sizes: '96x96'
			, href: '/favicon.png'
		})
		, h('link', {
			rel: 'stylesheet'
			, href: '/assets/app.css'
		})
		, h('script', {
			src: '/assets/app.js'
		})
	]);

	var body = h('body', data.body);

	var html = h('html', {
		lang: 'zh'
	}, [head, body]);

	return html;
};
