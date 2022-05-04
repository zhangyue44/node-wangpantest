const jwt = require('jsonwebtoken');
const errorType = require('../constants/err-types');
const userService = require('../service/user.service');
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config');

// 用户注册中间件
const verifyUser = async(ctx, next) => {
  const {name, password} = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  const result = await userService.getUserName(name);
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

const handlePassword = async(ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

// 用户登录中间件
const verifyLogin = async(ctx, next) => {
  const {name, password} = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  const result = await userService.getUserName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }
  ctx.user = user;
  await next();
}

// 检查用户是否授权
const verifyAuth = async(ctx, next) => {
  const authorization = ctx.header.authorization;
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyLogin,
  verifyAuth
}