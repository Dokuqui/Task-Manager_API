import express, { Response, Request } from 'express'
import { Task } from '../models/task'
import { authenticateJWT } from '../middleware/authMiddleware'

const router = express.Router()

// Temporary in-memory storage for tasks (replace with database later)
let tasks: Task[] = []

// Route to get all tasks
router.get('/tasks', authenticateJWT, (req: Request, res: Response) => {
  const userId = (req as any).userId
  res.json({ message: `Retrieving tasks for user ${userId}` })
})

// Route to create a new task (protected route)
router.post('/tasks', authenticateJWT, (req: Request, res: Response) => {
  const newTask: Task = req.body
  tasks.push(newTask)
  res.status(201).json(newTask)
});

// Route to update a task by ID (protected route)
router.put('/tasks/:id', authenticateJWT, (req: Request, res: Response) => {
  const taskId: string = req.params.id
  const updatedTask: Task = req.body
  const index = tasks.findIndex(task => task.id === taskId)
  if (index !== -1) {
    tasks[index] = updatedTask
    res.json(updatedTask)
  } else {
    res.status(404).send('Task not found')
  }
});

// Route to delete a task by ID (protected route)
router.delete('/tasks/:id', authenticateJWT, (req: Request, res: Response) => {
  const taskId: string = req.params.id
  tasks = tasks.filter(task => task.id !== taskId)
  res.status(204).send()
});

export default router