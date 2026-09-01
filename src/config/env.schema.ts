import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  EXTERNAL_API: z.url(),
  SUPABASE_URL: z.url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string()
})

export type EnvConfig = z.infer<typeof envSchema>
