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
  group_id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsUrl()
  photo: string

  @IsOptional()
  @IsDateString()
  createdAt: Date

  @IsOptional()
  @IsDateString()
  updatedAt: Date
}
