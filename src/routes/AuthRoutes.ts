import express, { Response, Request } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user' 
import exp from 'constants'

const router = express.Router()

let users: User[] = []

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        password: hashedPassword
    }

    users.push(newUser)

    res.status(201).json(newUser)
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = users.find(u => u.email === email)

    if (!user) {
        return res.status(404).send('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(404).send('Incorrect Password')
    }

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' })

    res.json({ token })
})

export default router