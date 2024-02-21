import { Request, Response } from 'express'
import { LoginData } from '../../data/login'
import { User } from '../../models/models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: LoginData = req.body
    const user = await User.findOne({ email: loginData.email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const passwordMatch = await bcrypt.compare(loginData.password, user.password)
    if (!passwordMatch) {
      res.status(404).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN!, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
