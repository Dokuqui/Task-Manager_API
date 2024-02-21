import express from 'express'
import { initiatePasswordReset } from '../controllers/auth/passwordResetController'
import { resetPassword } from '../controllers/auth/passwordResetController'

const router = express.Router()

// Route to initiate password reset
router.post('/forget-password', initiatePasswordReset)

// Route to reset password
router.post('/reset-password', resetPassword);

export default router