import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../config/prisma/prisma.service.js'
import { SpecLessonsService } from '../spec-lessons/spec-lessons.service.js'

@Injectable()
export class ScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly specLessonsService: SpecLessonsService
  ) {}

  async getGroupSchedule(
    id: string,
    week?: 'even' | 'odd',
    withSpecials: boolean = true,
    selectives: string[] = []
  ) {
    const schedule = await this.fetchSchedule(id, week, selectives)
    if (!withSpecials) {
      return schedule
    }

    const urlMap = new Map<string, string | null>()
    for (const lesson of schedule) {
      if (lesson.externalId) {
        urlMap.set(lesson.externalId, lesson.subject?.url ?? null)
      }
    }

    const specials = await this.specLessonsService.getSpecials(id, urlMap)

    return [...schedule, ...specials]
  }

  private async fetchSchedule(
    id: string,
    week?: 'even' | 'odd',
    selectives: string[] = []
  ) {
    const weekParity = week?.toUpperCase() as 'EVEN' | 'ODD'

    const subjectFilter =
      selectives.length > 0
        ? {
            OR: [{ is_selective: false }, { subject_id: { in: selectives } }]
          }
        : { is_selective: false }

    return await this.prisma.schedule.findMany({
      where: {
        group_id: id,
        week_parity: weekParity ? { in: [weekParity, 'BOTH'] } : undefined,
        subject: subjectFilter
      },
      include: {
        subject: {
          omit: {
            created_at: true,
            updated_at: true
          }
        },
        location: {
          select: { name: true, url: true }
        }
      },
      omit: {
        group_id: true,
        subject_id: true,
        location_id: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  async getAllSelectives(groupId: string) {
    return await this.prisma.schedule.findMany({
      where: {
        group_id: groupId,
        subject: {
          is_selective: true
        }
      },
      include: {
        subject: {
          omit: {
            created_at: true,
            updated_at: true
          }
        },
        location: {
          select: { name: true, url: true }
        }
      }
    })
  }
}
