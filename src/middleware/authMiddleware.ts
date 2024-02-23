import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' })
  }

  (req as any).token = token

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT secret not defined' })
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' })
    }
    (req as any).userId = (decoded as any).userId
    next()
  })
}
