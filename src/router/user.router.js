const Router = require('koa-router');

const userRouter = new Router({prefix: '/user'});
userRouter.post('/', create);  // 用户注册