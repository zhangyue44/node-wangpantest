class Model {
  successModel({code, msg, data}) {
    return {
      code: code ? code : '200',
      msg: msg,
      data: data
    }
  }

  errorModel({code, msg, data}) {
    return {
      code: code,
      msg: msg,
      data: data
    }
  }
}

module.exports = new Model();