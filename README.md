# API

Find a Friend é um sistema de adoção de animais.
Nela, conseguimos visualizar os animais disponíveis para adoção, uma vez cadastrados no sistema.

O cadastro de pets é vinculado a uma organização. Ou seja, aqui temos uma relação de 1:N, onde uma organização pode cadastrar vários pets. Só que, um pet só está associado a somente uma única organização.

Para cadastrar um pet, é preciso primeiro cadastrar a organização responsável por aquele pet.

Para que seja possível ver todos os pets disponíveis, é preciso informa a cidade, para que todos os pets cadastros por uma ou várias organizações que residem nesta cidade, possam aparecer na busca. Existem outros filtros de busca, porém o único obrigatório é da cidade.

O contato com a organização é feito via WhatsApp, o interessado consegue essa informação pesquisando a organização mais próxima, através da sua localização.

O sistema conta também com autenticação de uma organização. Para ter acesso ao sistema como ADMIN, a organização precisa se autenticar.
O sistema conta também com uma estratégia de refresh token.

A APi foi construída seguindo os princípios do SOLID, padrão Factory, Repository e In-Memory Test Database.

## Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

## Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Stack utilizada

**Back-end:** TypeScript, Node.js, Fastify, Zod, Prisma, PostgreSQL, Docker, JWT e Vitest.


## Funcionalidades

- Cadastro de pet;
- Consulta de todos os pets cadastrados;
- Consulta com filtro de características do pet;
- Consulta de um único pet pelo ID.
- Cadastro de org;
- Autenticação de org;

## Documentação da API

#### Cadastro de Organização

```http
  POST /orgs
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
|  |     | **Obrigatório**. Informações necessárias para cadastrar uma organização. |

#### Autenticação de Organização

```http
  POST /orgs/authenticate
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     |     | **Obrigatório**. Enviar e-mail e senha, para autenticação |

#### Busca por organizações mais próximas

```http
  GET /orgs/nearby
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|   `localização do usuário`   | `string` | **Obrigatório**. Enviar a localização do usuário.  |

#### Refresh Token

```http
  PATCH /token/refresh
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|    |  | **Obrigatório**. Enviar e-mail e senha, para geração de um novo token para o usuário.  |

#### Cadastro de Pet

```http
  POST /orgs/pets
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     |      | **Obrigatório**. Enviar as informações necessárias para cadastrar um pet. |

#### Busca por todos os pets mais próximos

```http
  GET /orgs/pets
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     |      | **Obrigatório**. Enviar a localização do usuário. |

#### Busca de um determinado pet

```http
  GET /orgs/pets/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|  `petId`   |   `string`   | **Obrigatório**. Enviar o ID do pet. |

## Aprendizados

Essa foi a primeira aplicação em que eu apliquei os conhecimentos de SOLID, padrão Factory e Repository em um projeto. De forma teórica, eu conhecia os princípios do SOLID, mas, na hora de aplica isso em um projeto, ficava travado.

Neste projeto eu pude aplicar passo a passo cada princípios do SOLID, além de utilizar alguns padrões. Foi uma experiência em tanto.


## Instalação

Instale a API com npm ou yarn

```bash
  git clone git@github.com:Cr-Israel/find-a-friend-solid.git
  npm/yarn install
  npm run dev || yarn dev
  docker compose up -d
```
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

  `DATABASE_URL`
  `NODE_ENV`
  `JWT_SECRET`

Com as suas devidas informações do banco de dados, ambiente de desenvolvimento e secret do JWT.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Autores

- [@Cr-Israel](https://www.github.com/Cr-Israel)


## Feedback

Feedbacks são sempre bem-vindos.
Se você tiver algum feedback, por favor me deixe saber: carlosisrael08@hotmail.com

