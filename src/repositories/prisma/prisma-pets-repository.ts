import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { FindAllParams, PetRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetRepository {
  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        Org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    if (!pet) {
      return null
    }

    return pet
  }
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

}