import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import 'reflect-metadata'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') ?? 3000

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = new DocumentBuilder().setTitle('Lessons schedule API').build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, documentFactory)

  await app.listen(port, () => {
    console.log(`The server is running on: http://localhost:${port}`)
  })
}
bootstrap()
