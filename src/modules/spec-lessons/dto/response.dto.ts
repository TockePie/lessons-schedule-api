import { Type } from 'class-transformer'
import { IsArray, IsString, ValidateNested } from 'class-validator'

import { GroupScheduleDayItem } from './schedule-day.dto.js'

export class GroupScheduleResponse {
  @IsString()
  groupCode: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupScheduleDayItem)
  scheduleFirstWeek: GroupScheduleDayItem[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupScheduleDayItem)
  scheduleSecondWeek: GroupScheduleDayItem[]
}
