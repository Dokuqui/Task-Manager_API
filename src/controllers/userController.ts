import { Request, Response } from 'express'
import { User } from '../models/models'
import { UserData } from '../data/user'

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

export const updateUserUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id
    const { newUsername } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true },
    )
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    }
    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating username:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateUserEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id
    const { newEmail } = req.body

    const updatedUser = await User.findByIdAndUpdate(userId, { email: newEmail }, { new: true })
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
    }
    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating username:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateUserProfilePicture = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id
    const { newProfilePicture } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: newProfilePicture },
      { new: true },
    )

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating profile picture:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
