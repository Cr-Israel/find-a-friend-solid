import { Pet } from "@prisma/client"

import { PetRepository } from "@/repositories/pet-repository"
import { PetNotFoundError } from "./errors/pet-not-found-error"

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(
    private petRepository: PetRepository
  ) { }

  async execute({
    id
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petRepository.findById(id)

    if(!pet) {
      throw new PetNotFoundError()
    }

    return {
      pet
    }
  }
}