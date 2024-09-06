// test/authController.test.js
const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Auth Routes', () => {
  test('POST /api/auth/register - successful registration', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'testpassword'
      })
      .expect(201);

    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - successful login', async () => {
    // First, register the user
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'testpassword'
      });

    // Then log in
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword'
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});