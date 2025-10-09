import { UUID } from 'node:crypto'

import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SpeciLessonsService {
  private readonly externalUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.externalUrl = this.configService.get<string>('EXTERNAL_API')
  }

  getSpeciLessons(group_id: UUID) {
    const res = this.httpService.axiosRef.get(
      `${this.externalUrl}/schedule/lessons?groupId=${group_id}`
    )
  }
}
