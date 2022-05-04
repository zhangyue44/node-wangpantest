const path = require('path')
const fs = require('fs')
const { FILE_PATH } = require('../constants/file-path.js');
const plateService = require('../service/plate.service')
class PlateController {
  async create(ctx, next) {
    const { filename, mimetype, size, path } = ctx.req.file
    const result = await plateService.create(filename, mimetype, size, path, ctx.user.id)
    console.log(result);
    ctx.body = '22222';
  }
  async getFile(ctx, next) {
    const name = ctx.request.body.name
    const filePath = path.resolve(process.cwd(), FILE_PATH, name)
    ctx.response.set('content-type', ctx.mimetype)
    // 下面这两种方法都行，一个是绝对路径，一个是相对路径
    ctx.body = fs.createReadStream(`${FILE_PATH}/${name}`)
    // ctx.body = fs.createReadStream(filePath)
  }
}

module.exports = new PlateController();
