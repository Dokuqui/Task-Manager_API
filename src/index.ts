import express, { Request, Response } from 'express';
import taskRoutes from './routes/TaskRoutes'
import authRoutes from './routes/AuthRoutes'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json())

// Routes
app.use('/api', taskRoutes)
app.use('/api/auth', authRoutes)

// Error Handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.log(err.stack)
  res.status(500).send('There is an error')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
