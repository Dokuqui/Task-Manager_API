/**
 * @swagger
 * tags:
 *   name: User
 *   description: User end-points
 */

import express from 'express'
import * as userController from '../controllers/userController'
import { authenticateJWT } from '../middleware/authMiddleware'
import { authorize } from '../middleware/roleMiddleware'

const router = express.Router()

// Route to create a new user
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid request body.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.post('/users', userController.createUser, authorize(['admin', 'user']))

// Route to get all users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.get('/users', authenticateJWT, userController.getAllUsers, authorize(['admin']))

// Route to get a user by ID
router.get('/users/:id', authenticateJWT, userController.getUserById, authorize(['admin', 'user']))

// Route to update a user by ID
router.put('/users/:id', authenticateJWT, userController.updateUser, authorize(['admin']))

// Route to delete a user by ID
router.delete('/users/:id', authenticateJWT, userController.deleteUser, authorize(['admin']))

// Route to update a user username by ID
router.put('/users/:id/username', authenticateJWT, userController.updateUserUsername, authorize(['admin', 'user']))

// Route to update a user email by ID
router.put('/users/:id/email', authenticateJWT, userController.updateUserUsername, authorize(['admin', 'user']))

// Route to update a user profile picture by ID
router.put('/users/:id/profile-picture', authenticateJWT, userController.updateUserProfilePicture, authorize(['admin', 'user']))

export default router
