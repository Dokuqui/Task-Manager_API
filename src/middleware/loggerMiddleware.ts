import { Request, Response, NextFunction } from 'express'
import logger from '../logger'

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`)
  res.on('finish', () => {
    logger.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
  })
  next()
}

export default loggingMiddleware
