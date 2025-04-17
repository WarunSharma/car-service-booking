import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
})