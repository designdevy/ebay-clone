import express from 'express';
import {
  helloController,
  registerController,
} from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());
router.post('/register', registerController.post);
router.get('/hello', helloController.get);

export default router;
