import { Type } from 'class-transformer'
import { IsArray, IsEnum, ValidateNested } from 'class-validator'

import { GroupLesson } from './lesson.dto.js'

export enum DayKey {
  Пн = 'Пн',
  Вв = 'Вв',
  Ср = 'Ср',
  Чт = 'Чт',
  Пт = 'Пт',
  Сб = 'Сб',
  Нд = 'Нд'
}

export class GroupScheduleDayItem {
  @IsEnum(DayKey)
  day: DayKey

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupLesson)
  pairs: GroupLesson[]
}
