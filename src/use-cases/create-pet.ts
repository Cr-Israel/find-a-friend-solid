import { Pet } from "@prisma/client"

import { OrgRepository } from "@/repositories/org-repository"
import { PetRepository } from "@/repositories/pet-repository"
import { OrgNotFoundError } from "./errors/org-not-found-error"

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgRepository: OrgRepository,
    private petRepository: PetRepository
  ) { }

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }


    const pet = await this.petRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id
    })

    return {
      pet
    }
  }
}