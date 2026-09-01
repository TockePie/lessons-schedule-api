import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EnvConfig } from '../../../config/env.schema.js'
import filterSpeciLessons from '../../../utils/filter-speci-lessons.js'

import { GroupScheduleResponse } from './dto/schedule.js'

@Injectable()
export class SpeciLessonsService {
  private readonly externalUrl: string | undefined

  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvConfig, true>
  ) {
    this.externalUrl = this.configService.get('EXTERNAL_API', {
      infer: true
    })
  }

  async getSpeciLessons(group_id: string): Promise<GroupScheduleResponse> {
    const url = `${this.externalUrl}/schedule/lessons?groupId=${group_id}`
    const res = await this.httpService.axiosRef.get<GroupScheduleResponse>(url)

    const { scheduleFirstWeek, scheduleSecondWeek } = filterSpeciLessons(
      res.data
    )

    return {
      groupCode: res.data.groupCode,
      scheduleFirstWeek,
      scheduleSecondWeek
    }
  }
}
