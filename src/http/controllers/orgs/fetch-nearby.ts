import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeFetchNearbyOrgsUseCase } from "@/use-cases/factories/make-fetch-nearby-orgs";

export async function fetchNearby(request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyOrgsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const {
    latitude,
    longitude
  } = fetchNearbyOrgsQuerySchema.parse(request.query)

  const fetchNearbyOrgsUseCase = makeFetchNearbyOrgsUseCase()

  try {
    const { orgs } = await fetchNearbyOrgsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude
    })

    return reply.status(200).send({
      orgs,
    })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}