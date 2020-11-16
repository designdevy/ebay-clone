import { registerService } from '../services';

export const registerController = {
  async post(req, res, next) {
    const { username, password } = req.body;
    try {
      await registerService.registerUser(username, password);
      res.status(200).json('Registration successful');
    } catch (err) {
      next(err);
    }
  },
};
