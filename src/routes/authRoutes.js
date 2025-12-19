import express from 'express';
import { registerUser, login } from '../controllers/authController.js';
import { validate, registerSchema, loginSchema } from '../middleware/validation.js';
const authrouter = express.Router();

authrouter.post('/register', validate(registerSchema), registerUser);
authrouter.post('/login', validate(loginSchema), login);

export default authrouter;
