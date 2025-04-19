import express from 'express';
import cors from 'cors';
import swagerUi from "swagger-ui-express";
import swaggerDocs from './swagger/swagger';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', healthRoutes);
app.use('/api-docs', swagerUi.serve, swagerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
})