
/**
 * index.js
 *
 * App entry point
 */

var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var session = require('koa-session');
var Grant = require('grant-koa');

var db = require('./components/db/db');
var dev = require('./components/dev/dev');
var router = require('./components/router/router');
var configFactory = require('./components/config/config');
var i18n = require('./components/i18n/i18n');
var errorHandler = require('./components/error-handler/internal-error-handler');
var renderer = require('./components/renderer/renderer');

var app = koa();
var config = configFactory();
var grant = new Grant(config.oauth);

app.keys = [config.cookies.key];

app.use(logger());
app.use(dev(app.env));
app.use(configFactory(true));
app.use(i18n(true));
app.use(db());
app.use(session(config.session, app));
app.use(renderer());
app.use(errorHandler());

app.use(mount(grant));
router(app);

app.listen(config.server.port);
