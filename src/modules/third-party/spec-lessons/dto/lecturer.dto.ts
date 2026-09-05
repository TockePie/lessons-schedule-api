import { IsOptional, IsString } from 'class-validator'

export class Lecturer {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsOptional()
  name: string
}
