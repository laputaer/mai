
/**
 * error-handler.js
 *
 * Handle common errors throw by route handlers
 * eg. cache service down, db query failure etc.
 */

var builder = require('../builders/index-error');
var prepareData = require('../builders/prepare-data');
var i18n = require('../templates/i18n')();

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
	// STEP 1: internal service down, no need to yield downstream
	if (this.db === false || this.cache === false) {
		errorPage(this);
		return;
	}

	// STEP 2: handle uncaught upstream error
	try {
		yield next;
	} catch (err) {
		this.app.emit('error', err, this);
		errorPage(this);
		return;
	}

	// STEP 3: handle upstream custom error
	if (this.state.error_page) {
		errorPage(this, this.state.error_page);
		return;
	}

	// STEP 4: custom 404 page for unmatched route
	if (this.status === 404 && !this.state.vdoc) {
		errorPage(this, {
			status: 404
			, message: i18n.t('error.not-found-page')
		});
		return;
	}
};

/**
 * Setup human friendly error page
 *
 * @param   Object  ctx  Koa context
 * @param   Object  err  Upstream error status
 * @return  Void
 */
function errorPage(ctx, err) {
	// prepare common data
	var data = prepareData(ctx);

	// default to generic error
	err = err || {
		status: 500
		, message: i18n.t('error.internal-service-down')
	};

	data.error_status = i18n.t('error.status-code', { code: err.status })
	data.error_message = err.message;

	// status code and page output
	ctx.status = err.status;
	ctx.state.vdoc = builder(data);
};
