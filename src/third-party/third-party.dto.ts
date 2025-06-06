import { UUID } from 'node:crypto'

import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class ThirdPartyExamDto {
  @IsInt()
  @ApiProperty({
    type: Number,
    format: 'int32',
    example: 0
  })
  readonly daysLeft: number

  @IsUUID()
  id: UUID

  @IsDate()
  date: Date

  @IsString()
  @IsOptional()
  lecturerName?: string

  @IsUUID()
  @IsOptional()
  lecturerId?: UUID

  @IsString()
  @IsOptional()
  room?: string

  @IsString()
  @IsOptional()
  subjectShort?: string

  @IsString()
  @IsOptional()
  subject?: string

  @IsString()
  @IsOptional()
  group?: string

  @IsUUID()
  @IsOptional()
  groupId: UUID
}
