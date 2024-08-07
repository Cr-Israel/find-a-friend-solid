import { GetPetUseCase } from "../get-pet";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetsRepository())
}