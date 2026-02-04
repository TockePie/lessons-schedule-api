import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../config/prisma/prisma.service'
import { weekParity } from '../../generated/prisma/client'
import { scheduleWhereInput } from '../../generated/prisma/models'

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  getAllSelectives(groupId: string) {
    return this.prisma.schedule.findMany({
      where: {
        group_id: groupId,
        subject: {
          is_selective: true
        }
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
            url: true
          }
        },
        location: { select: { name: true, url: true } }
      }
    })
  }

  getGroupSchedule(id: string, week?: 'even' | 'odd') {
    const weekParity = week?.toUpperCase() as weekParity

    const where: scheduleWhereInput = {
      group_id: id
    }

    if (weekParity) {
      where.OR = [{ week_parity: weekParity }, { week_parity: 'BOTH' }]
    }

    return this.prisma.schedule.findMany({
      where,
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
