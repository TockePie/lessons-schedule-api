import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID
} from 'class-validator'

export class GroupDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    format: 'uuid'
  })
  group_id: string

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

export class GroupCreateDto extends GroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of the group',
    example: 'ІО-32'
  })
  name: string

  @IsUrl()
  @ApiProperty({
    type: String,
    description: 'Photo URL of the group',
    example: 'https://example.com/photo.jpg'
  })
  photo: string
}
