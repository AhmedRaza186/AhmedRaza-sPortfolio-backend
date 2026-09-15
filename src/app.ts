import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import healthRoutes from './routes/health.routes';
import chatRoutes from './routes/chat.routes';
import feedbackRoutes from './routes/feedback.routes';

const app: Express = express();

const allowedOrigin = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

// Middleware
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // Increased limit for audio base64 uploads

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
