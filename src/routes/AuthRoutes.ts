import express from 'express'
import { loginUser } from '../controllers/auth/loginController'
import { registerUser } from '../controllers/auth/registrationController'
import { logoutUser } from '../controllers/auth/logoutController'

const router = express.Router()

// Route to login
router.post('/login', loginUser)

// Route to registry
router.post('/register', registerUser)

// Route to logout
router.post('/logout', logoutUser)

export default router