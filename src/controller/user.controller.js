const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
const userService = require('../service/user.service');
const model = require('../model/resultModel');

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user);
    const res = model.successModel({msg: '用户注册成功，请登录', data: []});
    ctx.body = res;
  }
  async createLogin(ctx, next) {
    const {id, name} = ctx.user;
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 过期时间：1天
      algorithm: 'RS256'
    });
    ctx.body = {
      msg: '',
      id,
      name,
      token
    }
  }
}

module.exports = new UserController();