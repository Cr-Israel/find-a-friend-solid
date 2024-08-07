import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
  })

  const body = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const org_id = request.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({message: 'Internal server error.'})
  }
}