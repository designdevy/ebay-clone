import db from '../data/connection';

const userRepo = {
  async addUser(username, password) {
    const sqlQuery = 'INSERT INTO users (username, password) VALUES (?)';
    try {
      await db.query(sqlQuery, [username, password]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
  async getUser(id) {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    try {
      const userQuery = await db.query(sqlQuery, id);
      return userQuery.results[0];
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
};

export default userRepo;
