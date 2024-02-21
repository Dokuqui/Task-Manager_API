export interface TaskData {
  title: string
  description: string
  dueDate?: Date
  priority?: string
  completed?: boolean
  categoryId?: string
  userId: string
}
