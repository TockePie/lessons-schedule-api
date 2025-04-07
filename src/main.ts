import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'

import { AppModule } from './api/app.module'

const PORT = process.env.PORT ?? 3000

void (async () => {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  console.log(chalk.black.bgGreenBright(`Server is running on port: ${PORT}`))

  await app.listen(PORT)
})()
