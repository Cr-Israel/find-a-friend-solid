import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { create } from "@/http/controllers/pets/create";
import { getPet } from "@/http/controllers/pets/get-pet";
import { searchPets } from "@/http/controllers/pets/search";

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJWT] }, create)

  app.get('/orgs/pets/:id', getPet)
  app.get('/orgs/pets', searchPets)
}