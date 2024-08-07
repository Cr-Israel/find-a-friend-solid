import { beforeEach, describe, expect, it } from "vitest"

import { CreatePetUseCase } from "./create-pet"
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository"
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"
import { OrgNotFoundError } from "./errors/org-not-found-error"

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Create Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new CreatePetUseCase(petRepository, orgRepository)
  })

  it('should not be able to create a pet with not existing org', async () => {
    await orgRepository.create({
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

    await expect(() =>
      sut.execute({
        name: 'Thor',
        about: 'Labrador',
        age: '7 anos',
        size: '90 centímetros',
        energy_level: 'Agitado',
        environment: 'Casa, quintal',
        org_id: 'org_01'
      })
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })

  it('should be able to create a pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Thor',
      about: 'Labrador',
      age: '7 anos',
      size: '90 centímetros',
      energy_level: 'Agitado',
      environment: 'Casa, quintal',
      org_id: org.id
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Thor')
    expect(pet.org_id).toEqual(org.id)
  })
})