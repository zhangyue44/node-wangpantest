const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const useRoutes = require('../router') 

const app = new Koa();

const errorHandle = require('./err-handle')

app.use(bodyParser());



useRoutes(app); 

app.on('error', errorHandle)

module.exports = app;