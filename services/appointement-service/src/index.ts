import express, { Response, Request } from 'express';
import swagerUi from "swagger-ui-express";
import dotenv from 'dotenv';
import swaggerDocs from './swagger/swagger';
import appointmentRoutes from './routes/appointement.routes';
import healthRoutes from './routes/health.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use('/api/appointments', appointmentRoutes);
app.use('/api', healthRoutes);
app.use('/api-docs', swagerUi.serve, swagerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
})