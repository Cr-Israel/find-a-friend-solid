import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetParamSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}