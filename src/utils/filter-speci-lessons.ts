import {
  GroupScheduleDayItem,
  GroupScheduleResponse
} from '../modules/third-party/speci-lessons/dto/schedule'

const filterWeek = (week: GroupScheduleDayItem[]): GroupScheduleDayItem[] => {
  return week
    .map((day) => ({
      ...day,
      pairs: day.pairs.filter((lesson) => lesson.dates.length > 0)
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
