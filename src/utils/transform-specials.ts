import { randomUUID } from 'node:crypto'

import { ScheduleLesson } from '../modules/schedule/types/schedule.type.js'

import { formatTeacherName } from './format-teachers-name.js'
import { getWeekParity } from './get-week-parity.js'
import { groupSpecials } from './group-specials.js'

const TIME_TO_ROW: Record<string, number> = {
  '08:30:00': 1,
  '10:25:00': 2,
  '12:20:00': 3,
  '14:15:00': 4,
  '16:10:00': 5,
  '18:05:00': 6
}

const TYPE_MAP: Record<string, string> = {
  Лек: 'LECTURE',
  Прак: 'PRACTICE',
  Лаб: 'LAB'
}

export function transformSpecials(
  groupedSpecials: ReturnType<typeof groupSpecials>,
  groupId: string,
  normalSchedule?: ScheduleLesson[]
) {
  const lessonUrls = new Map()

  if (normalSchedule) {
    for (const lesson of normalSchedule) {
      lessonUrls.set(lesson.externalId, lesson.subject.url)
    }
  }

  console.log({
    groupedSpecials,
    groupId,
    lessonUrls,
    normalSchedule: JSON.stringify(normalSchedule, null, 2)
  })

  return groupedSpecials.map((special) => ({
    id: randomUUID(),
    group_id: groupId,
    day: special.day,
    row: TIME_TO_ROW[special.time] ?? null,
    week_parity: getWeekParity(special.dates),
    isSpecial: true,
    dates: special.dates,
    externalId: special.uuid,
    location: special.location ?? null,
    subject: {
      subject_id: special.uuid,
      title: special.name,
      teacher: formatTeacherName(special.lecturer?.name),
      type: TYPE_MAP[special.type] || special.type,
      url: lessonUrls.get(special.uuid) ?? null,
      is_selective: false
    }
  }))
}
