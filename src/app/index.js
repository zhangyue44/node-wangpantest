const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router');
const errorHandle = require('./err-handle')

const app = new Koa();
app.use(bodyParser());
useRoutes(app);

app.on('error', errorHandle)

module.exports = app;