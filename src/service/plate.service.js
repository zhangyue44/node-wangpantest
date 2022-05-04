const connection = require('../app/datatbase');

class plateService {
  async create(filename, mimetype, size, path, id) {
    const statement = `INSERT INTO platetest (filename, mimetype, size, path, user_id) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [filename, mimetype, size, path, id]);
    return result[0]
  }
  async getFileInfo(filename) {
    const statement = `SELECT * FROM platetest WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0]
  }
}

module.exports = new plateService();