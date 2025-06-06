import { UUID } from 'node:crypto'

import { HttpService } from '@nestjs/axios'
import { HttpException, Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ThirdPartyExamDto } from './third-party.dto'

@Injectable()
export class ThirdPartyService {
  constructor(private httpService: HttpService) {}

  fetchExamData(groupId: UUID): Observable<ThirdPartyExamDto[]> {
    const URL = `https://api.campus.kpi.ua/schedule/exams/group?groupId=${groupId}`

    return this.httpService.get<ThirdPartyExamDto[]>(URL).pipe(
      map((response: AxiosResponse<ThirdPartyExamDto[]>) => {
        if (response.status !== 200) {
          throw new HttpException(
            `Error getting exam data: ${response.status} ${response.statusText}`,
            response.status
          )
        }

        return response.data
      })
    )
  }
}
