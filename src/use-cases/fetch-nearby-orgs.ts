import { Org } from "@prisma/client"

import { OrgRepository } from "@/repositories/orgs-repository"

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      orgs
    }
  }
}