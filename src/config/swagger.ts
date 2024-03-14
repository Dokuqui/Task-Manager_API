import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import * as path from 'path'

const router = express.Router()

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'This API allows users to manage tasks, users, and other related operations.',
  },
}

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [path.join(__dirname, '../routes/*.ts')],
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options)

// Serve Swagger documentation using Swagger UI
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router
