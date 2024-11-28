const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const userController = require('../controllers/userController');


// Mock del controlador
jest.mock('../controllers/userController', () => ({
  getLogin: jest.fn((req, res) => {
    return res.status(200).send('Login Page');
  }),
  postLogin: jest.fn((req, res) => {
    return res.status(200).send('Login Successful');
  }),
  getUsers: jest.fn((req, res) => {
    return res.status(200).send('Users List');
  }),
  getChat: jest.fn((req, res) => {
    return res.status(200).send('Chat Page');
  }),
}));


// Configurar la app de prueba
const app = express();
app.use(express.json()); // Para manejar JSON en las solicitudes
app.use('/', userRoutes);


describe('Testing user routes', () => {
  test('GET /login should return Login Page', async () => {
    const response = await request(app).get('/login');
    console.log('Response text:', response.text);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Login Page');
  });
 
  test('POST /login should return Login Successful', async () => {
    const response = await request(app).post('/login').send({ email: 'test@gmail.com', pass: '1234' });
    console.log('Response text:', response.text);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Login Successful');
  });
   
  test('GET /user should return Users List', async () => {
    const response = await request(app).get('/user');
    console.log('Response text:', response.text);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Users List');
  });


  test('GET /chat should return Chat Page', async () => {
    const response = await request(app).get('/chat');
    console.log('Response text:', response.text);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Chat Page');
  });
});

