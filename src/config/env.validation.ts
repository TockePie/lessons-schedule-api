import { Logger } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import { EnvironmentVariables } from './env.schema.js'

const logger = new Logger('ValidateEnv')

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    logger.error('Invalid environment variables:', errors.toString())
    throw new Error('Environment validation failed')
  }

  return validatedConfig
}
