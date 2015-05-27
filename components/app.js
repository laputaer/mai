
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

var errorHandler = require('./middlewares/error-handler');
var renderer = require('./middlewares/template-renderer');
var userSession = require('./middlewares/user-session');
var sanitization = require('./middlewares/output-sanitization');
var imageProxy = require('./middlewares/image-proxy');
var eventAnalytics = require('./middlewares/event-analytics');

var router = require('./router');
var environment = require('./environment');
var startUp = require('./start-up');

var app = koa();
var config = configFactory();
var grant = new Grant(config.oauth);

app.keys = [config.cookies.key];
app.proxy = config.server.proxy;

app.use(logger()); // logging
app.use(configFactory(true)); // this.config
environment(app); // livereload, static fileserver, base url
app.use(imageProxy()); // image proxy

app.use(bodyparser()); // this.request.body
app.use(session(config.session, app)); // this.session
app.use(flash(config.flash)); // this.flash

app.use(eventAnalytics()); // this.mixpanel
app.use(i18nFactory(true)); // this.i18n, this.locale
app.use(sanitization(true)); // this.xss
app.use(db()); // this.db, this.cache
app.use(renderer()); // this.body
app.use(errorHandler()); // this.state.vdoc
app.use(userSession()); // this.state.user

app.use(mount(grant)); // this.session.grant
router(app); // this.state.vdoc, this.state.error

startUp(app, config); // run server
