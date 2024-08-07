import { FastifyInstance } from "fastify";

import { create } from "@/http/controllers/orgs/create";
import { authenticate } from "@/http/controllers/orgs/authenticate";
import { fetchNearby } from "@/http/controllers/orgs/fetch-nearby";
import { refresh } from "@/http/controllers/orgs/refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/authenticate', authenticate)

  app.get('/orgs/nearby', fetchNearby)

  app.patch('/token/refresh', refresh)
}