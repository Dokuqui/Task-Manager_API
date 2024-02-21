import { Request, Response, NextFunction } from 'express'

interface CustomRequest extends Request {
    user?: any
}

export const authorize = (requiredRole: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === requiredRole) {
      next()
    } else {
      res.status(403).json({ error: 'Unauthorized: Insufficient permissions' })
    }
  }
}
