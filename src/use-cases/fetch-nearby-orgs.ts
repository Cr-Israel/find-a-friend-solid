import { Org } from "@prisma/client"

import { OrgRepository } from "@/repositories/org-repository"

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  orgs: Org[]
}

export class FetchNearbyGymsUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const orgs = await this.orgRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      orgs
    }
  }
}