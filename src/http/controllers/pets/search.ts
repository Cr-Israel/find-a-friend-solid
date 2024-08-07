import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pet-use-case";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional()
  })

  const body = searchPetQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute(body)

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error) {
      console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}