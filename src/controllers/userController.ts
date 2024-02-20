import { Request, Response } from 'express'
import { User } from '../models/models'
import { UserData } from '../models/user'

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: UserData = req.body
    const newUser = await User.create(userData)
    res.status(201).json(newUser)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Retrieve all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Retrieve a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id
    const newData: Partial<UserData> = req.body
    const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true })
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(updatedUser)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.status(204).send()
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
