import { db } from '../data/connection';

export const userRepo = {
  async addUser(username, password) {
    const sqlQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    try {
      await db.query(sqlQuery, [username, password]);
    } catch (err) {
      const userExistsRegex = new RegExp('Duplicate entry');
      if (userExistsRegex.test(err.sqlMessage)) {
        throw { status: 400, message: 'Username already exists' };
      }
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
