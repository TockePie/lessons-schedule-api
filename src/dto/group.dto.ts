import {
  IsDateString,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator'

export class GroupDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsUrl()
  photo: string

  @IsJSON()
  @IsNotEmpty()
  rowsAndDuration: string

  @IsJSON()
  @IsNotEmpty()
  schedule: string

  @IsOptional()
  @IsDateString()
  createdAt: Date

  @IsOptional()
  @IsDateString()
  updatedAt: Date
}
