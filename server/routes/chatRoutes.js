import express from 'express';
import { chatController } from '../controllers/chatController.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/chat', isLoggedIn, chatController);

export default router;