import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'

import { AppModule } from './app/app.module'

const PORT = process.env.PORT ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = new DocumentBuilder().setTitle('Lessons schedule API').build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, documentFactory)

  console.log(chalk.black.bgGreenBright(`Server is running on port: ${PORT}`))

  await app.listen(PORT)
}

bootstrap()
