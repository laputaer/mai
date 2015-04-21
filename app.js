
/**
 * app.js
 *
 * Koa app structure
 */

var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var session = require('koa-session');
var flash = require('koa-flash');
var bodyparser = require('koa-bodyparser');
var Grant = require('grant-koa');

var db = require('./components/db/db');
var dev = require('./components/dev/dev');
var router = require('./components/router/router');
var configFactory = require('./components/config/config');
var i18nFactory = require('./components/i18n/i18n');
var errorHandler = require('./components/error-handler/internal-error-handler');
var renderer = require('./components/renderer/renderer');
var userSession = require('./components/user/user-session');

var app = koa();
var config = configFactory();
var grant = new Grant(config.oauth);

app.keys = [config.cookies.key];
app.proxy = true;

app.use(logger());
app.use(dev(app.env));
app.use(bodyparser()); // this.request.body
app.use(session(config.session, app)); // this.session
app.use(flash(config.flash)); // this.flash

app.use(configFactory(true)); // this.config
app.use(i18nFactory(true)); // this.i18n
app.use(db()); // this.db, this.cache
app.use(renderer()); // this.body
app.use(errorHandler()); // this.state.vdoc
app.use(userSession()); // this.state.user

app.use(mount(grant)); // this.session.grant
router(app); // this.state.vdoc

// let index.js handle server startup
module.exports = app;
