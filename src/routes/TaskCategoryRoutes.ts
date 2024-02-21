import express from 'express'
import {
  createTaskCategory,
  getAllTaskCategory,
  getTaskCategoryById,
  updateTaskCategory,
  deleteTaskCategory,
} from '../controllers/taskCategoryController'
import {authenticateJWT} from '../middleware/authMiddleware'

const router = express.Router()

router.post('/task-categories', authenticateJWT, createTaskCategory)

router.get('/task-categories', authenticateJWT, getAllTaskCategory)

router.get('/task-categories/:id', authenticateJWT, getTaskCategoryById)

router.put('/task-categories/:id', authenticateJWT, updateTaskCategory)

router.delete('/task-categories/:id', authenticateJWT, deleteTaskCategory)

export default router
