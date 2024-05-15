import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import { authRoutes } from './routes/authRoutes.js';
import { errorResponseHandler, invalidPathHandler } from './middlewares/errorHandler.js';
import { userRouter } from './routes/userRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);

app.use(invalidPathHandler);
app.use(errorResponseHandler);