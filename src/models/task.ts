export interface Task {
    id: string,
    title: string,
    description?: string,
    dueDate?: Date,
    category?: string,
    completed: boolean
}