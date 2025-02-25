import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'

import { LoggerMiddleWare } from '../common/middlewares/logger.middleware'

import { GroupModule } from './group/group.module'

@Module({
  imports: [GroupModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
