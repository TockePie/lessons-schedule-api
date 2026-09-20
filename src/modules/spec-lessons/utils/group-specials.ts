import { filterSpecLessons } from './filter-spec-lessons.js'

const DAY_MAP = {
  Пн: 1,
  Вв: 2,
  Ср: 3,
  Чт: 4,
  Пт: 5,
  Сб: 6,
  Нд: 7
} as const

type EnrichedPair = ReturnType<
  typeof filterSpecLessons
>['scheduleFirstWeek'][number]['pairs'][number]

export type SpecialLessonItem = EnrichedPair & {
  day: number | undefined
}

export function groupSpecials(
  specials: ReturnType<typeof filterSpecLessons>
): SpecialLessonItem[] {
  const rawWeeks = [
    ...(specials.scheduleFirstWeek || []),
    ...(specials.scheduleSecondWeek || [])
  ]

  const specialsMap = new Map<string, SpecialLessonItem>()

  for (const dayEntry of rawWeeks) {
    const day = DAY_MAP[dayEntry.day]

    for (const pair of dayEntry.pairs ?? []) {
      if (!pair.uuid) continue

      const existing = specialsMap.get(pair.uuid)

      if (!existing) {
        specialsMap.set(pair.uuid, {
          ...pair,
          day
        })
        continue
      }

      const merged = new Set([...existing.dates, ...(pair.dates ?? [])])
      existing.dates = Array.from(merged).sort()
    }
  }

  return Array.from(specialsMap.values())
}
