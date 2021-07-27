const connection = require('../app/datatbase');

class UserService {
  async getUserName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async create(user) {
    const {name, password} = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);
    return result[0]
  }
}

module.exports = new UserService();