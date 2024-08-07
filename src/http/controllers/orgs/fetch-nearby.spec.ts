import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

describe('Fetch Nearby Orgs (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby orgs', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'TypeScript Org',
        author_name: 'Carlos',
        email: 'org20@example.com',
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
      .expect(201)

    await request(app.server)
      .post('/orgs')
      .send({
        name: 'JavaScript Org',
        author_name: 'Carlos',
        email: 'org21@example.com',
        whatsapp: '2199999-8888',
        password: '123456',
        cep: '21865-354',
        state: 'RJ',
        city: 'Rio de Janeiro',
        neighborhood: '',
        street: 'Rua dos Bonitos, 122',
        latitude: -22.5609389,
        longitude: -43.4032691,
      })
      .expect(201)

      const response = await request(app.server)
        .get('/orgs/nearby')
        .query({
          latitude: -22.872064,
          longitude: -43.3160192
        })
        .expect(200)

    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs[0].name).toEqual('TypeScript Org')
  })
})