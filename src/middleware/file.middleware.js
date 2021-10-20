const Multer = require('koa-multer');      // 引入第三方模块,用来上传文件
// const path = require('path');
const { FILE_PATH } = require('../constants/file-path.js');

// const fileUpload = Multer({
//   dest: FILE_PATH
// });

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb(null, file.originalname + path.extname(file.originalname)); // path.extname(file.originalname)获取到的是后缀
  }
})

const fileUpload = Multer({
  storage
});

const fileHandler = fileUpload.single('files'); // files字段是接口上传的字段，就是 key值 。而fileHandler是获取到的value值

module.exports = {
  fileHandler
}