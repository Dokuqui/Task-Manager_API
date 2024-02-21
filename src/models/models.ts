import mongoose, { Schema, Document, Model } from 'mongoose'

// Interface for Task document
interface ITask extends Document {
  title: string
  description: string
  dueDate?: Date
  priority?: string
  completed?: boolean
  categoryId?: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
}

// Interface for TaskCategory document
interface ITaskCategory extends Document {
  name: string
  description?: string
  userId: Schema.Types.ObjectId
}

// Interface for User document
interface IUser extends Document {
  username: string
  email: string
  password: string
  role: 'admin' | 'user' 
  createdAt: Date
}

// Define schema for Task collection
const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  priority: { type: String },
  completed: { type: Boolean, default: false },
  categoryId: { type: Schema.Types.ObjectId, ref: 'TaskCategory' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

// Define schema for TaskCategory collection
const taskCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

// Define schema for User collection
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
})

// Create models based on the schemas
const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema)
const TaskCategory: Model<ITaskCategory> = mongoose.model<ITaskCategory>(
  'TaskCategory',
  taskCategorySchema,
)
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export { Task, TaskCategory, User }
