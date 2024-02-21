import { Request, Response } from 'express'
import { TaskCategory } from '../models/models'
import { TaskCategoryData } from '../data/taskCategory'

export const createTaskCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskCategoryData: TaskCategoryData = req.body
    const newTaskCategory = await TaskCategory.create(taskCategoryData)
    res.status(201).json(newTaskCategory)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllTaskCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskCategories = await TaskCategory.find()
    res.json(taskCategories)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getTaskCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId: string = req.params.id
    const taskCategory = await TaskCategory.findById(categoryId)
    if (!taskCategory) {
      res.status(404).json({ message: 'Task Category not found' })
    } else {
      res.json(taskCategory)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTaskCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId: string = req.params.id
    const newData: Partial<TaskCategoryData> = req.body
    const updatedTaskCategory = await TaskCategory.findByIdAndUpdate(categoryId, newData, {
      new: true,
    })
    if (!updatedTaskCategory) {
      res.status(404).json({ message: 'Task Category not found' })
    } else {
      res.json(updatedTaskCategory)
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTaskCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId: string = req.params.id
    const deletedTaskCategory = await TaskCategory.findByIdAndDelete(categoryId)
    if (!deletedTaskCategory) {
      res.status(404).json({ message: 'Task Category: not found' })
    } else {
      res.status(204).send()
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
