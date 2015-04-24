
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

var db = require('./db/db');
var configFactory = require('./config/config');
var i18nFactory = require('./i18n/i18n');

var errorHandler = require('./middlewares/internal-error-handler');
var unexpectedErrorHandler = require('./middlewares/unexpected-error-handler');
var dev = require('./middlewares/local-development');
var renderer = require('./middlewares/template-renderer');
var userSession = require('./middlewares/user-session');

var router = require('./router');

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
app.use(unexpectedErrorHandler()); // this.state.vdoc
app.use(userSession()); // this.state.user

app.use(mount(grant)); // this.session.grant
router(app); // this.state.vdoc

// let index.js handle server startup
module.exports = app;
