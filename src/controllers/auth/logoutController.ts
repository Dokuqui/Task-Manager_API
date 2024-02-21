import { Request, Response } from 'express'

export const logoutUser = async (res: Response, req: Request): Promise<void> => {
  try {
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
