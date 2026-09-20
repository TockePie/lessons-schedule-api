import { IsOptional, IsString, IsUrl } from 'class-validator'

export class Link {
  @IsUrl()
  @IsOptional()
  uri: string

  @IsString()
  @IsOptional()
  title: string
}
