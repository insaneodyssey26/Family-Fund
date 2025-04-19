import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

export default router; 