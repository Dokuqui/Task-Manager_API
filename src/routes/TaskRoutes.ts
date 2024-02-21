import express from 'express'
import {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController'
import { authenticateJWT } from '../middleware/authMiddleware'
import { authorize } from '../middleware/roleMiddleware'

const router = express.Router()

// Route to create a new task
router.post('/tasks', authenticateJWT, createTask, authorize(['admin', 'user']))

// Route to get all tasks
router.get('/tasks', authenticateJWT, getAllTask, authorize(['admin', 'user']))

// Route to get a task by ID
router.get('/tasks/:id', authenticateJWT, getTaskById, authorize(['admin', 'user']))

// Route to update a task by ID
router.put('/tasks/:id', authenticateJWT, updateTask, authorize(['admin', 'user']))

// Route to delete a task by ID
router.delete('/tasks/:id', authenticateJWT, deleteTask, authorize(['admin', 'user']))

export default router
