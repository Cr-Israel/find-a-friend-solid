import { SearchPetsUseCase } from "../search-pets";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeSearchPetsUseCase() {
  return new SearchPetsUseCase(new PrismaPetsRepository())
}