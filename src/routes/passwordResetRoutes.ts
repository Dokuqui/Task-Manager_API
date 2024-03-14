/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: User password reset
 */

import express from 'express'
import { initiatePasswordReset } from '../controllers/auth/passwordResetController'
import { resetPassword } from '../controllers/auth/passwordResetController'

const router = express.Router()

// Route to initiate password reset
/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Initiate password reset
 *     tags: [Password Reset]
 *     description: Initiates the process to reset a user's password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset initiated successfully.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Internal server error.
 */
router.post('/forget-password', initiatePasswordReset)

// Route to reset password
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Resets a user's password using a reset token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Invalid request body or token.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: User not found or reset token expired.
 *       500:
 *         description: Internal server error.
 */
router.post('/reset-password', resetPassword);

export default router