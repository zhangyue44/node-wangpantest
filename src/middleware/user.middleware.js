const errorType = require('../constants/err-types');
const userService = require('../service/user.service');

const verifyLogin = async(ctx, next) => {
  const {name, password} = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  const result = await userService.getUserName(name);
  if (result.length) {

  }
}