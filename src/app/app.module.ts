import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { LoggerMiddleWare } from '../common/middlewares/logger.middleware'
import { ExamModule } from '../modules/exam/exam.module'
import { GroupModule } from '../modules/group/group.module'
import { ScheduleModule } from '../modules/schedule/schedule.module'

@Module({
  imports: [
    GroupModule,
    ScheduleModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ExamModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
