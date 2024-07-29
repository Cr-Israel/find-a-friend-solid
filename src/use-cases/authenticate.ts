import { Org } from "@prisma/client"
import { compare } from "bcryptjs"

import { OrgRepository } from "@/repositories/org-repository"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    
    return {
      org
    }
  }
}