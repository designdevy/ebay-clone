import express from 'express';
import {
  helloController,
  registerController,
  loginController,
} from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());
router.post('/register', registerController.post);
router.get('/hello', helloController.get);
router.post('/login', loginController.post);

export default router;
