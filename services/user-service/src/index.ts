import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
})