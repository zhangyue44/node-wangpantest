const Router = require('koa-router');
const { verifyUser, handlePassword, verifyLogin, verifyAuth } = require('../middleware/user.middleware')
const { create, createLogin } = require('../controller/user.controller');

const userRouter = new Router({prefix: '/user'});
 // 用户注册 用户是否已经存在 密码转暗文 用户保存到数据库
userRouter.post('/', verifyUser, handlePassword, create);
// 用户登录
userRouter.post('/login', verifyLogin, createLogin);
// 测试接口
userRouter.post('/plate/:id', verifyAuth);

module.exports = userRouter;