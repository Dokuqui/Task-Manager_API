/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

import express from 'express'
import { loginUser } from '../controllers/auth/loginController'
import { registerUser } from '../controllers/auth/registrationController'
import { logoutUser } from '../controllers/auth/logoutController'

const router = express.Router()

// Route to login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/login', loginUser)

// Route to registry
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/register', registerUser)

// Route to logout
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/logout', logoutUser)


export default router