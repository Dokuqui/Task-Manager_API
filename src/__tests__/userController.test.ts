import request from 'supertest'
import { app, uri, authSecret } from '../app'
import mongoose from 'mongoose'
import { User } from '../models/models'
import jwt from 'jsonwebtoken'

const userId = '65d5e5585ed2cbc01e7ee4df' as string
const userId_admin = '65d6427d9491ef51fd46c430' as string

beforeAll(async () => {
  await mongoose.connect(uri)
})

afterEach(async () => {
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('User Controller', () => {
  test('POST /users creates a new user', async () => {
    const response = await request(app)
      .post('/user/users')
      .set('Authorization', `Bearer ${authSecret}`)
      .send({
        username: 'testillia',
        email: 'illia@tester.com',
        password: 'password',
        role: 'admin',
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.username).toBe('testillia')
    expect(response.body.email).toBe('illia@tester.com')
  })

  test('GET /users get all users', async () => {
    const token = jwt.sign({ userId_admin }, authSecret, { expiresIn: '1h' })
    const response = await request(app)
      .get('/user/users')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('GET /users/:id get user by ID', async () => {
    const token = jwt.sign({ userId_admin }, authSecret, { expiresIn: '1h' })
    const response = await request(app)
      .get(`/user/users/:${userId}`)
      .set('Authorization', `JWT Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body._id).toBe(userId)
  })

  test('PUT /users/:id update user by ID', async () => {
    const token = jwt.sign({ userId_admin }, authSecret, { expiresIn: '1h' })
    const updatedData = { email: 'illiaT@tester.com' }
    const response = await request(app)
      .put(`/user/users/:${userId}`) // Adjust the route according to your implementation
      .set('Authorization', `JWT Bearer ${token}`)
      .send(updatedData)

    expect(response.status).toBe(200) // Assuming your route returns 200 for success
    expect(response.body.email).toBe(updatedData.email)
  })

  test('DELETE /users/:id delete user by ID', async () => {
    const token = jwt.sign({ userId_admin }, authSecret, { expiresIn: '1h' })
    const response = await request(app)
      .delete(`/user/users/:${userId}`) // Adjust the route according to your implementation
      .set('Authorization', `JWT Bearer ${token}`)

    expect(response.status).toBe(204) // Assuming your route returns 204 for success
  })
})
