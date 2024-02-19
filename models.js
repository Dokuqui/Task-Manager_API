const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema ({
    title: { type: String, require: true },
    description: { type: String, require: true },
    dueDate: { type: Date },
    priority: { type: String },
    completed: { type: Boolean, default: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskCategory' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
})

const taskCategorySchema = new mongoose.Schema ({
    name: { type: String, require: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
})

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Task = mongoose.model('Task', taskSchema)
const TaskCategory = mongoose.model('TaskCategory', taskCategorySchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    Task,
    TaskCategory,
    User
}