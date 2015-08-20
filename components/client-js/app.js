
/**
 * app.js
 *
 * Manage client-side app lifecycle
 */

'use strict';

var Service = require('./service');
var Model = require('./model');
var Renderer = require('./renderer');
var router = require('./router');

module.exports = App;

/**
 * App class
 *
 * @return  Void
 */
function App() {
	if (!(this instanceof App)) {
		return new App();
	}

	this.service = new Service();
	this.model = new Model();
	this.renderer = new Renderer();
}

/**
 * Initialize app state and view
 *
 * @return  Promise
 */
App.prototype.init = function () {
	var self = this;

	// get page global data from backend
	return self.service.init().then(function (data) {
		// init data store
		self.model.init(data);

		// init vdom and dom cache
		self.renderer.init({
			container: document.querySelector('.page')
			, production: self.model.get('production')
		});

		// error page
		if (self.model.get('error_status')) {
			self.renderer.update(false, self.model.get());
			return;
		}

		// match route
		var route = router(self.model.get());
		if (!route) {
			return;
		}

		// found route, get page-specific data from backend
		return self.service.sync(route).then(function (data) {
			// update data store
			self.model.update(data);

			// update view
			self.renderer.update(route.name, self.model.get());

			// user-specific data
			self.widget();
		});
	});
};

/**
 * Some pages need additional data to function, widget handles it
 *
 * @return  Void
 */
App.prototype.widget = function () {
	var self = this;
	var model = self.model.get();

	// match route
	var route = router(model);
	if (!route) {
		return;
	}

	// user profile need stash data
	if (route.name === 'userProfile' && route.params[0] === model.current_user.uid) {
		self.load('user_stash', {
			query: {
				limit: 20
			}
			, key: 'pid'
		});

		self.load('user_apps', {
			query: {
				limit: 20
			}
			, key: 'aid'
		});
	}
};

/**
 * Refresh app view
 *
 * @return  Void
 */
App.prototype.refresh = function () {
	var self = this;
	var model = self.model.get();

	// error page
	if (model.error_status && model.error_message) {
		self.renderer.update(false, model);
		return;
	}

	// match current route
	var route = router(model);
	if (!route) {
		return;
	}

	// trigger view update
	self.renderer.update(route.name, self.model.get());
};

/**
 * Read app state
 *
 * @param   Mixed   path  Store key path
 * @return  Object
 */
App.prototype.read = function (path) {
	var self = this;

	return self.model.get(path);
};

/**
 * Modify app state
 *
 * @param   Mixed   path  Store key path
 * @param   Mixed   data  New data
 * @return  Object
 */
App.prototype.modify = function (path, data) {
	var self = this;

	return self.model.set(path, data);
};

/**
 * Load data from backend and push onto app store
 *
 * @param   String   name  Backend service
 * @param   Object   opts  Optional parameters
 * @return  Promise
 */
App.prototype.load = function (name, opts) {
	var self = this;

	// match current route
	var route = router(self.model.get());
	if (!route) {
		return Promise.resolve(null);
	}

	// contact backend service
	return self.service.fetch(name, opts.query, route.params).then(function (data) {
		if (data.endpoint.ok && Array.isArray(data.endpoint.data)) {
			// make sure empty array init the array
			if (data.endpoint.data.length === 0 && self.model.get(name) === undefined) {
				self.model.set(name, []);
				return;
			}

			// otherwise append data
			data.endpoint.data.forEach(function (item) {
				self.model.append(name, item, opts.key);
			});
		}
	});
};

/**
 * Reload data from backend and refresh view
 *
 * @param   String   name  Backend service
 * @param   Object   opts  Optional parameters
 * @return  Promise
 */
App.prototype.reload = function (name, opts) {
	var self = this;

	// match current route
	var route = router(self.model.get());
	if (!route) {
		return Promise.resolve(null);
	}

	// contact backend service
	return self.service.fetch(name, opts.query, route.params).then(function (data) {
		if (data.endpoint.ok && Array.isArray(data.endpoint.data)) {
			// overwrite existing data and re-render view
			self.model.set(name, data.endpoint.data);
			self.renderer.update(route.name, self.model.get());
		}
	});
};

/**
 * Send request to backend and retrieve data
 *
 * @param   String   method  Request method
 * @param   String   url     Backend service endpoint
 * @param   Object   opts    Optional parameters
 * @param   Array    params  Optional route parameters
 * @return  Promise
 */
App.prototype.json = function (method, url, opts, params) {
	var self = this;

	opts = opts || {};

	// default to get request
	opts.method = opts.method || method || 'GET';

	// send cookie by default
	if (!opts.credentials) {
		opts.credentials = 'same-origin';
	}

	// auto append csrf token for other requests
	if (opts.method !== 'GET') {
		// default to urlencoded body
		opts.body = opts.body || '';
	}

	// common setup for urlencoded body
	if (typeof opts.body === 'string') {
		// set urlencoded header
		opts.headers = opts.headers || {};
		opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';

		// append csrf toekn
		var csrf = 'csrf_token=' + self.model.get(['current_user', 'csrf_token']);
		if (!opts.body) {
			opts.body = csrf;
		} else {
			opts.body = csrf + '&' + opts.body;
		}
	}

	// contact backend service, get back json result
	return self.service.send(url, opts, params).then(function (res) {
		try {
			return res.json();
		} catch(e) {
			// console.debug(e);
		}
		return null;
	}).then(function (json) {
		if (!json) {
			return {};
		}
		return json;
	});
};
