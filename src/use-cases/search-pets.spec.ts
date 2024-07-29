import { beforeEach, describe, expect, it } from "vitest"

import { SearchPetsUseCase } from "./search-pets"
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository"
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: SearchPetsUseCase

describe('Search Pets By City', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new SearchPetsUseCase(petRepository)
  })

  it('should be able to search pets by city', async () => {
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

    await petRepository.create({
      name: 'Thor',
      about: 'Labrador',
      age: '7 anos',
      size: '90 centímetros',
      energy_level: 'Agitado',
      environment: 'Casa, quintal',
      org_id: org.id
    })

    await petRepository.create({
      name: 'Leona',
      about: 'Golden',
      age: '3 meses',
      size: '20 centímetros',
      energy_level: 'Agitada',
      environment: 'Casa',
      org_id: org.id
    })

    const org2 = await orgRepository.create({
      name: 'Lindos',
      author_name: 'Carlos',
      email: 'org@example.com',
      whatsapp: '2188888-9999',
      password: '654321',
      cep: '21345-886',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: '',
      street: 'Rua dos Lindos, 211',
      latitude: -22.6498771,
      longitude: -43.3423036,
    })

    await petRepository.create({
      name: 'Bruce',
      about: 'Cane Corso',
      age: '8 meses',
      size: '70 cetímetros',
      energy_level: 'Protetor',
      environment: 'Casa, quintal',
      org_id: org2.id
    })

    const { pets } = await sut.execute({ city: org.city })
    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })
    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and other information', async () => {
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

    await petRepository.create({
      name: 'Thor',
      about: 'Labrador',
      age: '7 anos',
      size: '',
      energy_level: '',
      environment: '',
      org_id: org.id
    })

    await petRepository.create({
      name: 'Magno',
      about: 'Dog Alemão',
      age: '7 anos',
      size: '',
      energy_level: '',
      environment: '',
      org_id: org.id
    })

    await petRepository.create({
      name: 'Leona',
      about: 'Golden',
      age: '',
      size: '20 centímetros',
      energy_level: '',
      environment: '',
      org_id: org.id
    })

    await petRepository.create({
      name: 'Bruce',
      about: 'Cane Corso',
      age: '',
      size: '',
      energy_level: 'Agitado',
      environment: '',
      org_id: org.id
    })

    await petRepository.create({
      name: 'Mia',
      about: 'Golden',
      age: '',
      size: '',
      energy_level: '',
      environment: 'Casa',
      org_id: org.id
    })

    const { pets } = await sut.execute({ city: org.city, age: '7 anos' })
    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org.city, size: '20 centímetros' })
    expect(pets2).toHaveLength(1)

    const { pets: pets3 } = await sut.execute({ city: org.city, energy_level: 'Agitado' })
    expect(pets3).toHaveLength(1)

    const { pets: pets4 } = await sut.execute({ city: org.city, environment: 'Casa' })
    expect(pets4).toHaveLength(1)
  })
})