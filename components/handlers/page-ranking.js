
/**
 * page-ranking.js
 *
 * Koa route handler for ranking page
 */

var builder = require('../builders/index');
var prepareData = require('../builders/prepare-data');
var topClubs = require('../api/top-clubs')();
var hotClubs = require('../api/hot-clubs')();
var recentClubs = require('../api/recent-clubs')();

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

	// STEP 1: prepare common data
	var data = prepareData(this);

	// STEP 2: load clubs
	data.top_clubs = yield topClubs;
	data.hot_clubs = yield hotClubs;
	data.recent_clubs = yield recentClubs;

	// STEP 3: render page
	this.state.vdoc = builder(data);
};
