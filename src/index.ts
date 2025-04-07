import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import hackathonRoutes from './routes/hackathon.routes';
import blogRoutes from './routes/blog.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/blogs', blogRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Deepak Pandey Portfolio API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 