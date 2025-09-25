import { UUID } from 'node:crypto'

import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsObject,
  IsOptional,
  IsUrl,
  IsUUID
} from 'class-validator'

export class NewUrlDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    format: 'uuid'
  })
  id: UUID

  @IsObject()
  meta: Record<string, any>

  @IsDateString()
  @ApiProperty({
    type: Date,
    format: 'date-time'
  })
  createdAt: Date

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    type: Date,
    format: 'date-time'
  })
  updatedAt: Date
}

export class CreateNewUrlDto extends NewUrlDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    format: 'uuid'
  })
  subject_id: UUID

  @IsUrl()
  url: string
}
