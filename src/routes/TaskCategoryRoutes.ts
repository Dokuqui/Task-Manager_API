import express from 'express'
import {
  createTaskCategory,
  getAllTaskCategory,
  getTaskCategoryById,
  updateTaskCategory,
  deleteTaskCategory,
} from '../controllers/taskCategoryController'
import {authenticateJWT} from '../middleware/authMiddleware'
import { authorize } from '../middleware/roleMiddleware'

const router = express.Router()

// Route to create task category
router.post('/task-categories', authenticateJWT, createTaskCategory, authorize('admin' || 'user'))

// Route to get all task categories
router.get('/task-categories', authenticateJWT, getAllTaskCategory, authorize('admin' || 'user'))

// Route to get task category by ID
router.get('/task-categories/:id', authenticateJWT, getTaskCategoryById, authorize('admin' || 'user'))

// Route to update task category by ID 
router.put('/task-categories/:id', authenticateJWT, updateTaskCategory, authorize('admin' || 'user'))

// Route to delete task category by ID
router.delete('/task-categories/:id', authenticateJWT, deleteTaskCategory, authorize('admin' || 'user'))

export default router
