import { Org, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgRepository {
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Org[]>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}