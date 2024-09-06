const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.query('DELETE FROM users'); // Clear users table before tests
  });

  afterAll(async () => {
    await db.query('DELETE FROM users'); // Clear users table after tests
    // Do not call db.end() here if it's being called in another setup file
  });

  test('POST /auth/register - successful registration', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  test('POST /auth/register - missing fields', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser2'
        // Missing other fields
      });
    expect(response.statusCode).toBe(400);
  });

  test('POST /auth/login - successful login', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser3',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        email: 'test3@example.com'
      });

    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser3',
        password: 'password'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test('POST /auth/login - invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser3',
        password: 'wrongpassword'
      });
    expect(response.statusCode).toBe(401);
  });
});