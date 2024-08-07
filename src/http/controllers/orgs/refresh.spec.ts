import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server)
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

      const authResponse = await request(app.server)
        .post('/orgs/authenticate')
        .send({
          email: 'org@example.com',
          password: '123456'
        })

      const cookies = authResponse.get('Set-Cookie')

      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})