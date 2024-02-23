import { Request, Response } from 'express'
import { LoginData } from '../../data/login'
import { User } from '../../models/models'
import { authSecret } from '../../app'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: LoginData = req.body
    const user = await User.findOne({ email: loginData.email })
    if (!user) {
      res.status(401).json({ message: 'User not found' })
      return
    }

    const passwordMatch = await bcrypt.compare(loginData.password, user.password)
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    const jwtSecret = authSecret
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined')
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' })
    res.json({ token, userId: user._id })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
