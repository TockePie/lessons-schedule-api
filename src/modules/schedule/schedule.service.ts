import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../config/prisma/prisma.service'

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

  getGroupSchedule(
    id: string,
    week?: 'even' | 'odd',
    selectives: string[] = []
  ) {
    const weekParity = week?.toUpperCase() as 'EVEN' | 'ODD'

    return this.prisma.schedule.findMany({
      where: {
        group_id: id,
        week_parity: weekParity ? { in: [weekParity, 'BOTH'] } : undefined,
        subject:
          selectives.length > 0
            ? {
                OR: [
                  { is_selective: false },
                  { subject_id: { in: selectives } }
                ]
              }
            : undefined
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
