import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', bookRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
