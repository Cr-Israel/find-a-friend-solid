import crypto from "node:crypto"

import { Pet, Prisma } from "@prisma/client";

import { PetRepository } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }

}