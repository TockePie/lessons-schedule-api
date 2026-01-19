import { v5 as uuidv5 } from 'uuid'

import {
  GroupScheduleDayItem,
  GroupScheduleResponse
} from '../modules/third-party/speci-lessons/dto/schedule'

const NAMESPACE = '6ba7b814-9dad-11d1-80b4-00c04fd430c8'

//XXX: Used to generate uuid. Remove later
const filterWeek = (week: GroupScheduleDayItem[]): GroupScheduleDayItem[] => {
  return week
    .map((day) => ({
      ...day,
      pairs: day.pairs
        .filter((lesson) => lesson.dates.length > 0)
        .map((lesson) => ({
          ...lesson,
          uuid: uuidv5(`${lesson.name} - ${lesson.teacherName}`, NAMESPACE)
        }))
    }))
    .filter((day) => day.pairs.length > 0)
}

const filterSpeciLessons = (data: GroupScheduleResponse) => {
  const scheduleFirstWeek = filterWeek(data.scheduleFirstWeek)
  const scheduleSecondWeek = filterWeek(data.scheduleSecondWeek)

  return {
    scheduleFirstWeek,
    scheduleSecondWeek
  }
}

export default filterSpeciLessons
