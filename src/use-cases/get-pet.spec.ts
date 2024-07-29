import { beforeEach, describe, expect, it } from "vitest"

import { GetPetUseCase } from "./get-pet"
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository"
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository"
import { PetNotFoundError } from "./errors/pet-not-found-error"

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: GetPetUseCase

describe('Get Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)
    sut = new GetPetUseCase(petRepository)
  })

  it('should not be able to get a pet that does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'pet_01'
      })
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })

  it('should be able to get a pet', async () => {
    const pet = await petRepository.create({
      name: 'Thor',
      about: 'Labrador',
      age: '7 anos',
      size: '90 centímetros',
      energy_level: 'Agitado',
      environment: 'Casa, quintal',
      org_id: 'org_01'
    })

    const result = await sut.execute({id: pet.id})

    expect(result.pet).toEqual(pet)
  })
})