import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const body = createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.execute(body)

    return reply.status(201).send({
      org: {
        ...org,
        password: undefined
      }
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}