import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const org = await request(app.server)
      .post('/orgs')
      .send({
        name: 'Org Example',
        author_name: 'John Doe',
        email: 'orgtest5@example.com',
        whatsapp: '2199999-9999',
        password: '123456',
        cep: '21865-354',
        state: 'RJ',
        city: 'Rio de Janeiro',
        neighborhood: '',
        street: '',
        latitude: -22.872064,
        longitude: -43.3160192,
      })

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({
        email: 'orgtest5@example.com',
        password: '123456'
      })

    const token = authResponse.body.token;

    const createPet = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Thor',
        about: 'Labrador',
        age: '7 anos',
        size: '90 centímetros',
        energy_level: 'Agitado',
        environment: 'Casa, quintal',
        org_id: org.body.id,
      })

    const response = await request(app.server)
      .get(`/orgs/pets/${createPet.body.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.name).toEqual('Thor')
    expect(response.body.id).toEqual(expect.any(String))
  })
})