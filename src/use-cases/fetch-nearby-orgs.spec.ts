import { beforeEach, describe, expect, it } from "vitest"

import { FetchNearbyOrgsUseCase } from "./fetch-nearby-orgs"
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository"

let orgRepository: InMemoryOrgRepository
let sut: FetchNearbyOrgsUseCase

describe('Fetch Neaby Orgs', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new FetchNearbyOrgsUseCase(orgRepository)
  })

  it('should be able to fetch neaby orgs', async () => {
    const org = await orgRepository.create({
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

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toEqual([org])
    expect(nearbyOrgs.orgs[0].email).toEqual('org@example.com')
  })
})