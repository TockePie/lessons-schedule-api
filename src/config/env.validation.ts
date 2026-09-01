import { Logger } from '@nestjs/common'
import z from 'zod'

import { envSchema } from './env.schema.js'

const logger = new Logger('ValidateEnv')

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config)

  if (!result.success) {
    logger.error(
      'Invalid environment variables:',
      JSON.stringify(z.treeifyError(result.error), null, 2)
    )
    throw new Error('Environment validation failed')
  }

  return result.data
}
