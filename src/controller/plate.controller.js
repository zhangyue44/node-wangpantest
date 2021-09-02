class PlateController {
  async create(ctx, next) {
    console.log('111');
    ctx.body = '22222';
  }
}

module.exports = new PlateController();
