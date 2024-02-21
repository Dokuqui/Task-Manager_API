import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import taskRoutes from './routes/TaskRoutes'
import userRoutes from './routes/UserRoutes'
import taskCategoryRoutes from './routes/TaskCategoryRoutes'

const app = express()
const PORT = process.env.PORT || 3000

const uri = 'mongodb+srv://<USERNAME>:<PASSWORD>@task-manager-api.ezsex2b.mongodb.net/'

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

// Env to retrieve JWT_SECRET
require('dotenv').config()

// Middleware
app.use(express.json())

// Routes
app.use('/task', taskRoutes)
app.use('/user', userRoutes)
app.use('/task/category', taskCategoryRoutes)

// Error Handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
