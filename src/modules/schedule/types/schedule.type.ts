import { lessonType, weekParity } from '../../../generated/prisma/enums.js'

export interface LessonLocation {
  name: string
  url: string
}

export interface LessonSubject {
  subject_id: string
  title: string
  teacher: string
  url: string | null
  type: lessonType
  is_selective: boolean
}

export interface ScheduleLesson {
  id: string
  group_id: string
  externalId: string | null
  day: number
  row: number
  week_parity: weekParity
  location: LessonLocation | null
  subject: LessonSubject
}
