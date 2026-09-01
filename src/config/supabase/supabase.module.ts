import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from '@supabase/supabase-js'

import { EnvConfig } from '../env.schema.js'

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT'

@Module({
  providers: [
    {
      provide: SUPABASE_CLIENT,
      useFactory: (configService: ConfigService<EnvConfig, true>) => {
        const url = configService.get('SUPABASE_URL')
        const key = configService.get('SUPABASE_SERVICE_ROLE_KEY')
        return createClient(url, key)
      },
      inject: [ConfigService]
    }
  ],
  exports: [SUPABASE_CLIENT]
})
export class SupabaseModule {}
