import { Request, Response } from 'express'
import crypto from 'crypto'
import { User } from '../../models/models'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import fs from 'fs'

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const initiatePasswordReset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetToken = resetToken
    user.resetTokenExpires = Date.now() + 3600000
    await user.save()

    const resetInstructions = fs.readFileSync('resetInstructions.txt', 'utf8')

    await transporter.sendMail({
      from: 'sip1230@outlook.com',
      to: user.email,
      subject: 'Password Reset',
      html: resetInstructions,
    })

    res
      .status(200)
      .json({ message: 'Password reset initiated. Check your email for further instructions.' })
  } catch (error) {
    console.error('Error initiating password reset:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resetToken, newPassword } = req.body
    const user = await User.findOne({ resetToken })
    if (!user) {
      res.status(400).json({ message: 'Invalid or expired reset token.' })
      return
    }

    if (
      !(user.resetTokenExpires instanceof Date) ||
      user.resetTokenExpires.getTime() < Date.now()
    ) {
      res.status(400).json({ message: 'Reset token has expired' })
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    user.resetToken = null
    user.resetTokenExpires = null
    await user.save()

    res.status(200).json({ message: 'Password reset successfully.' })
  } catch (error) {
    console.error('Error resetting password:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}
