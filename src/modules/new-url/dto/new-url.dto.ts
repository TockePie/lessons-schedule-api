import {
  IsDateString,
  IsObject,
  IsOptional,
  IsUrl,
  IsUUID
} from 'class-validator'

export class NewUrlDto {
  @IsUUID()
  id: string

  @IsObject()
  meta: Record<string, any>

  @IsDateString()
  createdAt: Date

  @IsOptional()
  @IsDateString()
  updatedAt: Date
}

export class CreateNewUrlDto extends NewUrlDto {
  @IsUUID()
  subject_id: string

  @IsUrl()
  url: string
}
