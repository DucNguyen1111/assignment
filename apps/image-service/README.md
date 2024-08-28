<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Features
- REST API endpoints
- Prisma ORM integration with PostgreSQL
- Redis for caching
- AWS SQS integration for message queuing
- Implement at least one worker process that consumes messages from SQS

## Running the app

To run the migrate for your DB, use:

```sh
npx prisma migrate dev --create-only --skip-seed
npx prisma migrate dev --skip-seed
```

To create a production bundle:

```sh
npx nx build image-service
```

To run the dev server for your app, use:

```sh
npx nx serve image-service
```

## Structure

```

├── prisma
│   ├── migrations
│   │   ├── 20240825165218_init
│   │   │   └── migration.sql
│   │   ├── 20240826012722_change_name_image_table
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── app
│   │   └── app.module.ts
│   ├── assets
│   ├── _core
│   │   ├── config
│   │   │   ├── configuration.config.ts
│   │   │   └── index.ts
│   │   ├── constants
│   │   │   └── index.ts
│   │   ├── global
│   │   │   ├── prisma
│   │   │   │   ├── prisma.module.ts
│   │   │   │   └── prisma.service.ts
│   │   │   └── redis
│   │   │       ├── redis.module.ts
│   │   │       └── redis.service.ts
│   │   ├── interceptor
│   │   │   ├── index.ts
│   │   │   └── response.interceptor.ts
│   │   └── types
│   │       └── index.ts
│   ├── _helper
│   │   └── http-exception.filter.ts
│   ├── main.ts
│   ├── modules
│   │   └── image
│   │       ├── dto
│   │       │   └── find-all-image.dto.ts
│   │       ├── image.controller.ts
│   │       ├── image.module.ts
│   │       └── image.service.ts
│   └── service
│       ├── amqp
│       │   └── rabbitmq.service.ts
│       └── files
│           ├── upload-file.abstract.service.ts
│           └── upload-file.service.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── webpack.config.js
├── Dockerfile
├── env.example
├── jest.config.ts
├── project.json
└── README.md

```
