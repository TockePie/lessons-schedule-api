import {
  IsDateString,
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

  @IsOptional()
  @IsDateString()
  createdAt: Date

  @IsOptional()
  @IsDateString()
  updatedAt: Date
}
