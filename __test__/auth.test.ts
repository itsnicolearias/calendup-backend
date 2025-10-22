
import request from 'supertest'
import Database from "../src/libs/sequelize";
import app from "../src/index"

beforeAll(async () => {
  // Sincroniza la base de datos de test antes de todos los tests
  //await Database.sync({ force: true })
})

afterAll(async () => {
  // Cierra la conexión después de todos los tests
  await Database.close()
})

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'teamprueba5@yopmail.com',
        password: 'nuevaContraseña1234',
        firstName: 'michael',
        lastName: 'ceres'
      })
      .expect(201)  // asumimos que devuelve 201 Created

console.log(res)
    // Validar respuesta
    expect(res).toHaveProperty('message')  

  })
})
