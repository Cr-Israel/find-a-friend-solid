import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'Bonitos',
        author_name: 'Carlos',
        email: 'org@example.com',
        whatsapp: '2199999-8888',
        password: '123456',
        cep: '21865-354',
        state: 'RJ',
        city: 'Rio de Janeiro',
        neighborhood: '',
        street: 'Rua dos Bonitos, 122',
        latitude: -22.872064,
        longitude: -43.3160192,
      })

    expect(response.statusCode).toBe(201)
  })
})