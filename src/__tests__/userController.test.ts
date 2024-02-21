import request from 'supertest'
import { app, uri } from '../app' // Assuming your Express app is exported from src/app.ts
import mongoose from 'mongoose'

const userId = "65d63f074cd16535dd7d2765"
const authToken = process.env.JWT_SECRET

beforeAll(async () => {
  // Connect to a test database before running the tests
  await mongoose.connect(uri)

  // Log in as a user and obtain authentication token
  const loginResponse = await request(app)
    .post('/user/auth/login') // Adjust the route according to your authentication endpoint
    .send({ email: 'illia@tester.com', password: 'password' })
})

afterAll(async () => {
  // Disconnect from the test database after running all tests
  await mongoose.connection.close()
})

describe('User Controller', () => {
  test('POST /users creates a new user', async () => {
    const response = await request(app)
      .post('/user/users')
      .set('Authorization', `JWT Bearer ${authToken}`)
      .send({ username: 'testillia', email: 'illia@tester.com', password: 'password', role: 'admin' })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.username).toBe('testillia')
    expect(response.body.email).toBe('illia@tester.com')
  })

  test('GET /users get all users', async () => {
    const response = await request(app)
      .get('/user/users') // Adjust the route according to your implementation
      .set('Authorization', `JWT Bearer ${authToken}`)

    expect(response.status).toBe(200) // Assuming your route returns 200 for success
    expect(Array.isArray(response.body)).toBe(true) // Ensure response is an array of users
  })

  test('GET /users/:id get user by ID', async () => {
    const response = await request(app)
      .get(`/user/users/:${userId}`) // Adjust the route according to your implementation
      .set('Authorization', `JWT Bearer ${authToken}`)

    expect(response.status).toBe(200) // Assuming your route returns 200 for success
    expect(response.body._id).toBe(userId)
  })

  test('PUT /users/:id update user by ID', async () => {
    const updatedData = { email: 'illiaT@tester.com' }
    const response = await request(app)
      .put(`/user/users/:${userId}`) // Adjust the route according to your implementation
      .set('Authorization', `JWT Bearer ${authToken}`)
      .send(updatedData)

    expect(response.status).toBe(200) // Assuming your route returns 200 for success
    expect(response.body.email).toBe(updatedData.email)
  })

  test('DELETE /users/:id delete user by ID', async () => {
    const response = await request(app)
      .delete(`/user/users/:${userId}`) // Adjust the route according to your implementation
      .set('Authorization', `JWT Bearer ${authToken}`)

    expect(response.status).toBe(204) // Assuming your route returns 204 for success
  })
})
