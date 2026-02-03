import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from '@supabase/supabase-js'

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT'

@Module({
  providers: [
    {
      provide: SUPABASE_CLIENT,
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('SUPABASE_URL')!
        const key = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!
        return createClient(url, key)
      },
      inject: [ConfigService]
    }
  ],
  exports: ['SUPABASE_CLIENT']
})
export class SupabaseModule {}
