import express, { Response, Request } from 'express'
import { Task } from '../models/task'

const router = express.Router()

// Temporary in-memory storage for tasks (replace with database later)
let tasks: Task[] = []

// Route to get all tasks
router.get('/tasks', (req: Request, res: Response) => {
    res.json()
})

// Route to create new task
router.post('/tasks', (req: Request, res: Response) => {
    const newTask: Task = req.body
    tasks.push(newTask)
    res.status(201).json(newTask)
})

// Route to update a task by ID
router.put('/tasks/:id', (req: Request, res: Response) => {
    const taskId: string = req.params.id
    const updatedTask: Task = req.body
    const index = tasks.findIndex(task => task.id === taskId)
    if (index !== -1) {
        tasks[index] = updatedTask
        res.json(updatedTask)
    } else {
        res.status(404).send('Task not found')
    } 
})

// Route to delete a task by ID
router.delete('/tasks/:id', (req: Request, res: Response) => {
    const taskId: string = req.params.id
    tasks = tasks.filter(task => task.id !== taskId)
    res.status(204).send()
})

export default router