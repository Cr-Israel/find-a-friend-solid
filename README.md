# 🐾 Find a Friend — API de adoção de pets

API REST para conectar pessoas interessadas em adotar animais às ONGs e organizações
responsáveis por eles. Construída seguindo os princípios **SOLID**, com testes unitários,
testes E2E e pipeline de CI.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat-square&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)

---

## O problema

Organizações de resgate animal não têm um canal padronizado para divulgar os pets disponíveis,
e quem quer adotar precisa procurar em redes sociais espalhadas. Esta API centraliza esse
cadastro e permite busca por localidade.

## Como funciona

Uma organização se cadastra e autentica. A partir daí ela cadastra pets — a relação é **1:N**
(uma organização, vários pets; um pet pertence a uma única organização).

Quem busca informa a **cidade** (único filtro obrigatório) e recebe os pets cadastrados por
todas as organizações daquela cidade. Filtros opcionais permitem refinar por características
do animal. O contato final acontece via WhatsApp da organização.

---

## Decisões técnicas

- **SOLID + padrão Repository** — a regra de negócio vive em *use cases* que dependem de
  interfaces, não do Prisma. Trocar o banco não exige tocar no domínio.
- **Repositórios in-memory nos testes unitários** — a suíte roda em milissegundos, sem
  subir container de banco.
- **Autenticação com refresh token** — access token curto e refresh token em cookie
  `httpOnly`, reduzindo a janela de exposição em caso de vazamento.
- **Testes E2E isolados por schema** — cada arquivo de teste roda em um schema PostgreSQL
  próprio, permitindo execução em paralelo sem interferência.
- **CI no GitHub Actions** — testes unitários e E2E rodam a cada push.

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Runtime | Node.js |
| Linguagem | TypeScript |
| Framework HTTP | Fastify |
| ORM | Prisma |
| Banco | PostgreSQL |
| Autenticação | JWT + refresh token (`@fastify/jwt`, `@fastify/cookie`) |
| Validação | Zod |
| Testes | Vitest (unitários e E2E) |
| Infra | Docker + Docker Compose |
| CI | GitHub Actions |

---

## Como rodar

```bash
# 1. Clone o repositório
git clone https://github.com/Cr-Israel/find-a-friend-solid.git
cd find-a-friend-solid

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env

# 4. Suba o banco
docker compose up -d

# 5. Rode as migrations
npx prisma migrate dev

# 6. Inicie a aplicação
npm run start:dev
```

A API sobe em `http://localhost:3333`.

## Testes

```bash
npm run test        # unitários
npm run test:e2e    # end-to-end
npm run test:coverage
```

---

## Regras de negócio

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## Regras da aplicação

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

---

## Licença

MIT
