import crypto from "node:crypto"

import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

import { OrgRepository } from "../org-repository";

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = await this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = await this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }
  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }

}