const db = require('../db');
const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.close();
});

describe('Concert Controller', () => {
  test('should fetch all concerts', async () => {
    const response = await request(app).get('/api/concerts');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test('should create a new concert', async () => {
    const newConcert = {
      title: 'Test Concert',
      date: '2023-12-01',
      artist: 'Test Artist'
    };
    const response = await request(app).post('/api/concerts').send(newConcert);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});