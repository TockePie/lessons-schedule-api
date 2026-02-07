import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../config/prisma/prisma.service'
import { Prisma, weekParity } from '../../generated/prisma/client'

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
    //TODO: Implement filtering by selectives

    /** Case 1: filtering by group_id - should display all week parities and all selectives
    SELECT * FROM public.schedule
    INNER JOIN subject
    ON schedule.subject_id = subject.subject_id
    WHERE schedule.group_id = '480ada29-7f77-4ce9-96d7-01b47dfd5860'
     */

    /** Case 2: filtering by group_id and selectives - should display all week parities and selected selectives. We can pass week parity as an argument instead and it should display selected week parity and all selectives
    SELECT * FROM public.schedule
    INNER JOIN subject
    ON schedule.subject_id = subject.subject_id
    WHERE schedule.group_id = '480ada29-7f77-4ce9-96d7-01b47dfd5860'
      AND (
            schedule.subject_id IN (
                'ca27e719-4553-41da-b2dc-91fda9e8509d',
                '21b24bd8-54e6-4f7a-b1a7-bf8b3f79bff8'
            )
            OR subject.is_selective = false
          );
     */

    /** Case 3: filtering by group_id, week_parity and selectives - should display selected week parity and selected selectives
    SELECT * FROM public.schedule
    INNER JOIN subject
    ON schedule.subject_id = subject.subject_id
    WHERE schedule.group_id = '480ada29-7f77-4ce9-96d7-01b47dfd5860'
      AND (
            schedule.subject_id IN (
                'ca27e719-4553-41da-b2dc-91fda9e8509d',
                '21b24bd8-54e6-4f7a-b1a7-bf8b3f79bff8'
            )
            OR subject.is_selective = false
          )
      AND (
            schedule.week_parity = 'EVEN'
            OR schedule.week_parity = 'BOTH'
          );
     */

    const weekParity = week?.toUpperCase() as weekParity

    const where: Prisma.scheduleWhereInput = {
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
