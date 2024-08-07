import { FetchNearbyOrgsUseCase } from "../fetch-nearby-orgs";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeFetchNearbyOrgsUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository())
}