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
import { SupabaseModule } from './config/supabase/supabase.module.js'
import { GroupModule } from './modules/group/group.module.js'
import { ScheduleModule } from './modules/schedule/schedule.module.js'
import { SpeciLessonsModule } from './modules/third-party/speci-lessons/speci-lessons.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),

    GroupModule,
    ScheduleModule,
    SpeciLessonsModule
  ],
  providers: [
    SupabaseModule,
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
