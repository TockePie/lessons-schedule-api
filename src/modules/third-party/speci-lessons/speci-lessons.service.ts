import { UUID } from 'node:crypto'

import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import filterSpeciLessons from 'src/utils/filter-speci-lessons'

import { GroupScheduleResponse } from './dto/schedule'

@Injectable()
export class SpeciLessonsService {
  private readonly externalUrl: string | undefined

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.externalUrl = this.configService.get<string>('EXTERNAL_API', {
      infer: true
    })
  }

  async getSpeciLessons(group_id: UUID): Promise<GroupScheduleResponse> {
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
