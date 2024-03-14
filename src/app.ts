import express, { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import { validationResult } from 'express-validator'
import { createUserValidationRules } from './validationRules'
import mongoose from 'mongoose'
import taskRoutes from './routes/TaskRoutes'
import userRoutes from './routes/UserRoutes'
import taskCategoryRoutes from './routes/TaskCategoryRoutes'
import authRoutes from './routes/AuthRoutes'
import passwordResetRoutes from './routes/passwordResetRoutes'
import dotenv from 'dotenv'
import logger from './logger'
import helmet from 'helmet'
import swaggerRouter from './config/swagger';

dotenv.config()

export const app = express()
const PORT = process.env.PORT || 3000

export const uri = process.env.MONGODB_CONNECTION as string
console.log('MongoDB URI:', uri)

export const authSecret = process.env.JWT_SECRET as string
console.log('JWT token:', authSecret)

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 100,
  message: 'Too many request from this IP, try again a little bit later!'
})
app.use(limiter)

// Helmet middleware for security headers
app.use(helmet())

// Middleware
app.use(express.json())

// Routes
app.use('/task', taskRoutes)
app.use('/user', userRoutes)
app.use('/user/auth', authRoutes)
app.use('/user/auth', passwordResetRoutes)
app.use('/task/category', taskCategoryRoutes)
app.use(swaggerRouter)

// Define route with validation middleware
app.post('/user/auth', createUserValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
})

// Logger usage logic
logger.info('This is an informational message')
logger.error('This is an error message')

// Error Handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
