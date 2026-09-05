import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
  ValidateNested
} from 'class-validator'

import { Lecturer } from './lecturer.dto.js'
import { Link } from './link.dto.js'

export class GroupLesson {
  @IsString()
  @IsOptional()
  type: string

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
  time: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  readonly place: string

  @ValidateNested()
  @IsOptional()
  @Type(() => Link)
  location: Link | null

  @IsString()
  @IsOptional()
  tag: string

  @IsArray()
  @IsDateString({}, { each: true })
  dates: string[]

  @IsString()
  @IsOptional()
  readonly teacherName: string

  @IsString()
  @IsOptional()
  readonly lecturerId: string

  @Type(() => Lecturer)
  @IsOptional()
  lecturer: Lecturer | null
}
