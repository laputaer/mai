
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var session = require('koa-session');
var bodyParser = require('koa-bodyparser');

var configFactory = require('./components/config/config');
var config = configFactory();

var db = require('./components/db/db');
var dev = require('./components/dev/dev');
var router = require('./components/router/router');

var Grant = require('grant-koa');
var grant = new Grant(config.oauth);

var app = koa();
app.keys = [config.cookies.key];

app.use(logger());
app.use(dev(app.env));
app.use(configFactory(true));
app.use(db());

app.use(session(config.session, app));
app.use(bodyParser());
app.use(mount(grant));

router(app);

app.listen(config.server.port);
