import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      ;(req as any).userId = (decoded as any).userId
      next()
    })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
