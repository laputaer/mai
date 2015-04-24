
/**
 * club-new.js
 *
 * Koa route handler for new club creation page
 */

var builders = require('../builders/builders');
var findUser = require('./find-user');

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
	yield next;

	// prepare common data
	var data = builders.prepareData(this);

	// guest user
	if (!data.current_user) {
		data.body.push(builders.login(data));

	// login user
	} else {
		data.user = yield findUser.apply(this);
		data.body.push(builders.clubNew(data));
	}

	// render vdoc
	this.state.vdoc = builders.doc(data);
};
