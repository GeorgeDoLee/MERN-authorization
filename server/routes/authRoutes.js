import express from 'express';
import { signup, signin } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);

export {router as authRoutes};