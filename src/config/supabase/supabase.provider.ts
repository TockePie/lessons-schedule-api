import { ConfigService } from '@nestjs/config'
import { createClient } from '@supabase/supabase-js'

import { EnvConfig } from '../env.schema'

export const SupabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  useFactory: (configService: ConfigService<EnvConfig, true>) => {
    const url = configService.get('SUPABASE_URL')
    const key = configService.get('SUPABASE_SERVICE_ROLE_KEY')
    return createClient(url, key)
  }
}
