import express, { Request, Response } from 'express'
import { RegistrationData } from '../../data/registration'
import { User } from '../../models/models'
import bcrypt from 'bcryptjs'

export const registerUser = async (res: Response, req: Request): Promise<void> => {
    try {
        const registrationData: RegistrationData = req.body
        const existingUser = await User.findOne({email: registrationData.email})
        if (existingUser) {
            res.status(404).json({ message: 'User already exist' })
        }

        const hashedPassword = await bcrypt.hash(registrationData.password, 10)

        const newUser = await User.create({
            username: registrationData.username,
            email: registrationData.email,
            password: hashedPassword
        })

        res.status(201).json({ message: 'User was successfully created', user: newUser })
    } catch (error) {
        console.log('Error registering user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}