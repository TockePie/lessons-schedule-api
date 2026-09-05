import { HttpService } from '@nestjs/axios'
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { firstValueFrom } from 'rxjs'

import { EnvConfig } from '../../config/env.schema.js'
import { GroupService } from '../group/group.service.js'

import { GroupScheduleResponse } from './dto/response.dto.js'
import { filterSpecLessons } from './utils/filter-spec-lessons.js'
import { groupSpecials } from './utils/group-specials.js'
import { transformSpecials } from './utils/transform-specials.js'

@Injectable()
export class SpecLessonsService {
  private readonly externalUrl: string
  private readonly logger = new Logger(SpecLessonsService.name)

  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
    @Inject(ConfigService)
    private readonly configService: ConfigService<EnvConfig, true>,
    private readonly groupService: GroupService
  ) {
    this.externalUrl = this.configService.get('EXTERNAL_API', {
      infer: true
    })
  }

  async getSpecials(group_id: string, urlMap: Map<string, string | null>) {
    const { externalId, groupId } = await this.getGroup(group_id)
    const rawSpecials = await this.fetchExternalData(externalId)
    const specials = await this.validateResponse(rawSpecials)

    const filteredSpecials = filterSpecLessons(specials)
    const groupedSpecials = groupSpecials(filteredSpecials)
    const transformedSpecials = transformSpecials(
      groupedSpecials,
      groupId,
      urlMap
    )
    return transformedSpecials
  }

  private async getGroup(group_id: string) {
    const group = await this.groupService.getGroupById(group_id)
    if (!group?.externalId) {
      throw new InternalServerErrorException(
        `The group ${group_id} has no external ID.`
      )
    }

    return {
      externalId: group.externalId,
      groupId: group.group_id
    }
  }

  private async fetchExternalData(externalGroupId: string) {
    const url = `${this.externalUrl}/schedule/lessons?groupId=${externalGroupId}`
    const { data } = await firstValueFrom(this.httpService.get(url))
    return data
  }

  private async validateResponse(data: unknown) {
    const instance = plainToInstance(GroupScheduleResponse, data)

    return validateOrReject(instance)
      .then(() => instance)
      .catch((errors) => {
        this.logger.error(
          'External API validation failed',
          JSON.stringify(errors, null, 2)
        )
        throw new InternalServerErrorException(
          'Invalid response from external schedule API'
        )
      })
  }
}
