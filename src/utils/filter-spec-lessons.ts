import { GroupLesson } from '../modules/third-party/spec-lessons/dto/lesson.dto.js'
import { GroupScheduleResponse } from '../modules/third-party/spec-lessons/dto/response.dto.js'
import { GroupScheduleDayItem } from '../modules/third-party/spec-lessons/dto/schedule-day.dto.js'

import { generateUuid } from './generate-uuid.js'

const enrichLesson = (lesson: GroupLesson) => ({
  ...lesson,
  uuid: generateUuid(
    `${lesson.name ?? 'Unknown'} - ${lesson.lecturer?.name ?? 'Unknown'} - ${lesson.type ?? 'Unknown'}`
  )
})

const processDay = (day: GroupScheduleDayItem) => {
  const pairs = day.pairs
    .filter((lesson) => lesson.dates.length > 0)
    .map(enrichLesson)

  return { ...day, pairs }
}

const filterWeek = (week: GroupScheduleDayItem[]) => {
  return week.filter((day) => day.pairs.length > 0).map(processDay)
}

export const filterSpecLessons = (data: GroupScheduleResponse) => ({
  ...data,
  scheduleFirstWeek: filterWeek(data.scheduleFirstWeek),
  scheduleSecondWeek: filterWeek(data.scheduleSecondWeek)
})
