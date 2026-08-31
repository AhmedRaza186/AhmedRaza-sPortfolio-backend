import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import healthRoutes from './routes/health.routes';
import chatRoutes from './routes/chat.routes';

const app: Express = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
