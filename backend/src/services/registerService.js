import bcrypt from 'bcrypt';
import { userRepo } from '../repositories';

export const registerService = {
  validateUserData(username, password) {
    if (!username || !password) {
      throw { status: 400, message: 'Username and/or password is required' };
    }
    if (password.length < 8) {
      throw { status: 400, message: 'Password must be at least 8 characters' };
    }
    const userRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (!userRegex.test(username)) {
      throw {
        status: 400,
        message: 'Incorrect username format',
      };
    }
    return null;
  },
  async registerUser(username, password) {
    this.validateUserData(username, password);
    const hash = bcrypt.hashSync(password, 10);
    const insertQuery = await userRepo.addUser(username, hash);
    const userId = insertQuery.results.insertId;
    const user = await userRepo.getUser(userId);
    return user;
  },
};
