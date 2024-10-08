import { Pet } from "@prisma/client"

import { PetRepository } from "@/repositories/pets-repository"

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(
    private petRepository: PetRepository
  ) { }

  async execute({
    city,
    age,
    size,
    energy_level,
    environment
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {

    const pets = await this.petRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment
    })

    return {
      pets
    }
  }
}