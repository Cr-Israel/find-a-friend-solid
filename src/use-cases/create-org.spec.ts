import { beforeEach, describe, expect, it } from "vitest"
import { compare } from "bcryptjs"

import { CreateOrgUseCase } from "./create-org"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository"

let orgRepository: InMemoryOrgRepository
let sut: CreateOrgUseCase

describe('Create Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('should not be able to create an org with existing email', async () => {
    const orgEmail = 'org@example.com'

    await orgRepository.create({
      name: 'Bonitos',
      author_name: 'Carlos',
      email: orgEmail,
      whatsapp: '2199999-8888',
      password: '123456',
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
        name: 'Lindo',
        author_name: 'Israel',
        email: orgEmail,
        whatsapp: '2199999-8888',
        password: '123456',
        cep: '21865-354',
        state: 'RJ',
        city: 'Rio de Janeiro',
        neighborhood: '',
        street: 'Rua dos Bonitos, 122',
        latitude: -22.872064,
        longitude: -43.3160192,
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be able to create an org', async () => {
    const orgEmail = 'org@example.com'

    const { org } = await sut.execute({
      name: 'Bonitos',
      author_name: 'Carlos',
      email: orgEmail,
      whatsapp: '2199999-8888',
      password: '123456',
      cep: '21865-354',
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: '',
      street: 'Rua dos Bonitos, 122',
      latitude: -22.872064,
      longitude: -43.3160192,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.email).toEqual(orgEmail)
  })

  it('should hash org password upon creation', async () => {
    const orgEmail = 'org@example.com'

    const { org } = await sut.execute({
      name: 'Bonitos',
      author_name: 'Carlos',
      email: orgEmail,
      whatsapp: '2199999-8888',
      password: '123456',
      cep: '21865-354',
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: '',
      street: 'Rua dos Bonitos, 122',
      latitude: -22.872064,
      longitude: -43.3160192,
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      org.password
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})