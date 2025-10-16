import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../config/prisma/prisma.service'
import { weekParity } from '../../generated/prisma'

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  getGroupSchedule(id: string, week: 'even' | 'odd') {
    const weekParity = week.toUpperCase() as weekParity

    return this.prisma.schedule.findMany({
      where: {
        group_id: id,
        OR: [{ week_parity: weekParity }, { week_parity: 'BOTH' }]
      },
      select: {
        id: true,
        day: true,
        row: true,
        week_parity: true,
        subject: {
          select: {
            title: true,
            teacher: true,
            type: true,
            url: true,
            is_selective: true
          }
        },
        location: { select: { name: true, url: true } }
      }
    })
  }
}
