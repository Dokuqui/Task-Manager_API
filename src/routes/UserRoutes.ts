import express from 'express'
import * as userController from '../controllers/userController'
import { authenticateJWT } from '../middleware/authMiddleware'

const router = express.Router()

// Route to create a new user
router.post('/users', userController.createUser)

// Route to get all users
router.get('/users', authenticateJWT, userController.getAllUsers)

// Route to get a user by ID
router.get('/users/:id', authenticateJWT, userController.getUserById)

// Route to update a user by ID
router.put('/users/:id', authenticateJWT, userController.updateUser)

// Route to delete a user by ID
router.delete('/users/:id', authenticateJWT, userController.deleteUser)

export default router
