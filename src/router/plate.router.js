const Router = require('koa-router');
const { verifyAuth } = require('../middleware/user.middleware');
const { create, getFile } = require('../controller/plate.controller');
const { fileHandler, testControl } = require('../middleware/file.middleware');

const plateRouter = new Router({prefix: '/plate'});

// 获取首页展示的文件夹与文件信息
// 前端这里可以有一个plate根，后面的直接根据根进行路径拼接。 /plate/resource  /plate/我的资源
// 后端怎么保存数据呢，可以先进行判断，如果是文件夹，保存到数据库中 name icon time id type ,在新建完成文件夹后就调用接口进行数据保存，并重新获取数据。
// 还有一个上传文件，可以有一个按钮，进行点击上传，上传时先进行文件存储，再将基本信息保存到数据库，包括文件路径。查看的时候可以直接右击，有一个文件分享与文件内容查看(打开)，通过读取文件流的方式进行查看。 
// 
plateRouter.get('/', verifyAuth, create);

// 将前端上传的文件保存到本地服务器
// 目前还没有保存到数据库，因为还没有创建file表
plateRouter.post('/file', verifyAuth, fileHandler, create);

// 用来测试服务端向前端传输文件
plateRouter.post('/test', verifyAuth, testControl, getFile);

module.exports = plateRouter; 