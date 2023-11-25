const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const useRoutes = require("../router");

const app = new Koa();

const errorHandle = require("./err-handle");

app.use(cors());
app.use(bodyParser());

useRoutes(app);

app.on("error", errorHandle);

module.exports = app;
