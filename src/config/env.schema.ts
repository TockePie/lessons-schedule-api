import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class EnvironmentVariables {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : 3000))
  PORT: number = 3000

  @IsUrl({
    protocols: ['postgres', 'postgresql'],
    require_tld: false,
    require_protocol: true
  })
  DATABASE_URL: string

  @IsUrl()
  EXTERNAL_API: string

  @IsUrl()
  SUPABASE_URL: string

  @IsString()
  SUPABASE_SERVICE_ROLE_KEY: string
}

export type EnvConfig = EnvironmentVariables
