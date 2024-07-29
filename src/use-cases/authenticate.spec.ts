import { beforeEach, describe, expect, it } from "vitest"
import { compare, hash } from "bcryptjs"

import { AuthenticateOrgUseCase } from "./authenticate"
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let orgRepository: InMemoryOrgRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new AuthenticateOrgUseCase(orgRepository)
  })

  it('should not be able to authenticate an org with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org with wrong password', async () => {
    await orgRepository.create({
      name: 'Bonitos',
      author_name: 'Carlos',
      email: 'org@example.com',
      whatsapp: '2199999-8888',
      password: await hash('123456', 6),
      cep: '21865-354',
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: '',
      street: 'Rua dos Bonitos, 122',
      latitude: -22.872064,
      longitude: -43.3160192,
    })

    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123456789'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate an org', async () => {
    await orgRepository.create({
      name: 'Bonitos',
      author_name: 'Carlos',
      email: 'org@example.com',
      whatsapp: '2199999-8888',
      password: await hash('123456', 6),
      cep: '21865-354',
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: '',
      street: 'Rua dos Bonitos, 122',
      latitude: -22.872064,
      longitude: -43.3160192,
    })
    
    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})