import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  ValidateNested
} from 'class-validator'

export class GroupScheduleResponse {
  @IsUUID()
  @IsOptional()
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

export class GroupScheduleDayItem {
  @IsString()
  @IsOptional()
  day: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupLesson)
  pairs: GroupLesson[]
}

export class GroupLesson {
  @IsString()
  @IsOptional()
  type: string

  @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/)
  time: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  readonly place: string

  @Type(() => Link)
  location: Link

  @IsString()
  @IsOptional()
  tag: string

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @IsDateString({}, { each: true })
  dates: string[]

  @IsString()
  @IsOptional()
  readonly teacherName: string

  @IsString()
  @IsOptional()
  readonly lecturerId: string

  @Type(() => Lecturer)
  lecturer: Lecturer
}

export class Lecturer {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsOptional()
  name: string
}

export class Link {
  @IsUrl()
  @IsOptional()
  uri: string

  @IsString()
  @IsOptional()
  title: string
}
