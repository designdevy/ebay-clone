import { registerService } from '../services';

export const registerController = {
  async post(req, res, next) {
    const { username, password } = req.body;
    try {
      const newUser = await registerService.registerUser(username, password);
      res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  },
};
