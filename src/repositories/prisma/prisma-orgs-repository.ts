import { Org, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { FindManyNearbyParams, OrgRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgRepository {
  async findManyNearby({latitude, longitude}: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Org[]>`
      SELECT * FROM orgs
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({ where: { id } })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }
}