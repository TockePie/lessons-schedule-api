<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Lessons Schedule API

## Description

The lessons-schedule-api serves as the dedicated backend service for the [lessons-schedule-next](https://github.com/TockePie/lessons-schedule-next) ecosystem. It is a NestJS application designed to manage the complex relational data required to render the student schedules seen in the frontend.

## Project setup

```bash
npm install
```

Polute .env.local file:

```env
PORT=4000

# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=

# Supabase API key
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

EXTERNAL_API=
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
