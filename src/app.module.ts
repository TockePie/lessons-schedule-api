import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'

import { LoggerMiddleWare } from './common/middlewares/logger.middleware.js'
import { validateEnv } from './config/env.validation.js'
import { GroupModule } from './modules/group/group.module.js'
import { ScheduleModule } from './modules/schedule/schedule.module.js'
import { SpecLessonsModule } from './modules/third-party/spec-lessons/spec-lessons.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),

    GroupModule,
    ScheduleModule,
    SpecLessonsModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidUnknownValues: true,
        transform: true,
        whitelist: true
      })
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
