import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import 'reflect-metadata'

import { EnvConfig } from './config/env.schema.js'
import { AppModule } from './app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const configService = app.get(ConfigService<EnvConfig, true>)
  const port = configService.get('PORT')

  app.use(cookieParser())

  await app.listen(port, () => {
    console.log(`The server is running on: http://localhost:${port}`)
  })
}
bootstrap()
