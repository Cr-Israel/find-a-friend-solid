import crypto from "node:crypto"

import { Pet, Prisma } from "@prisma/client";

import { FindAllParams, PetRepository } from "../pet-repository";
import { InMemoryOrgRepository } from "./in-memory-org-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgRepository) { }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }
    
    return pet
  }

  async findAll(params: FindAllParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }

}