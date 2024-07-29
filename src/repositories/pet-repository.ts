import { Pet, Prisma } from "@prisma/client";

export interface FindAllParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export interface PetRepository {
  findAll(params: FindAllParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}