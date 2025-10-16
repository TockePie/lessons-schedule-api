import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'

import { LoggerMiddleWare } from '../common/middlewares/logger.middleware'
import { GroupModule } from '../modules/group/group.module'
import { ScheduleModule } from '../modules/schedule/schedule.module'
import { SpeciLessonsModule } from '../modules/third-party/speci-lessons/speci-lessons.module'

@Module({
  imports: [
    GroupModule,
    ScheduleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        EXTERNAL_API: Joi.string().uri().required()
      })
    }),
    SpeciLessonsModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
