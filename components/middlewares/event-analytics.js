
/**
 * event-analytics.js
 *
 * Allow user action to be collected
 */

var Mixpanel = require('mixpanel');
var mixpanel;

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory() {
	return middleware;
};

/**
 * Koa middleware
 *
 * @param   Function  next  Flow control
 * @return  Void
 */
function *middleware(next) {
	if (!mixpanel && this.config.analytics.mixpanel) {
		mixpanel = Mixpanel.init(this.config.analytics.mixpanel);
	}

	this.mixpanel = mixpanel;

	yield next;
};
