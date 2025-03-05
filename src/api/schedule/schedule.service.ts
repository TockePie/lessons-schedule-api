import { Injectable } from '@nestjs/common'
import { weekParity } from '@prisma/client'

import { PrismaService } from '../../config/prisma/prisma.service'

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  getGroupSchedule(id: string, week: 'even' | 'odd') {
    const weekParity = week.toUpperCase() as weekParity

    return this.prisma.schedule.findMany({
      where: {
        group_id: id,
        OR: [{ week_parity: weekParity }, { week_parity: 'BOTH' }]
      }
    })
  }
}
