import { Request, Response } from 'express'
import { Task } from '../models/models'
import { TaskData } from '../data/task'

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskData: TaskData = req.body
    const newTask = await Task.create(taskData)
    res.status(201).json(newTask)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.find()
    res.json(task)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId: string = req.params.id
    const task = Task.findById(taskId)
    if (!task) {
      res.status(404).json({ message: 'Task not found' })
    } else {
      res.json(task)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId: string = req.params.id
    const newData: Partial<TaskData> = req.body
    const updatedTask = await Task.findByIdAndUpdate(taskId, newData, {
      new: true,
    })
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' })
    } else {
      res.json(updatedTask)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId: string = req.params.id
    const deletedTask = await Task.findByIdAndDelete(taskId)
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' })
    } else {
      res.status(204).send()
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
