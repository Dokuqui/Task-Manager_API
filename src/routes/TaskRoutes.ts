import express, { Response, Request } from 'express'
import { TaskData } from '../models/task'
import {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController'
import { authenticateJWT } from '../middleware/authMiddleware'

const router = express.Router()

// Route to create a new task
router.post('/tasks', authenticateJWT, createTask)

// Route to get all tasks
router.get('/tasks', authenticateJWT, getAllTask)

// Route to get a task by ID
router.get('/tasks/:id', authenticateJWT, getTaskById)

// Route to update a task by ID
router.put('/tasks/:id', authenticateJWT, updateTask)

// Route to delete a task by ID
router.delete('/tasks/:id', authenticateJWT, deleteTask)

export default router
