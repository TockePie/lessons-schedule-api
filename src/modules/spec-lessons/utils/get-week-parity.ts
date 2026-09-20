import { getISOWeek, parseISO } from 'date-fns'

export function getWeekParity(dateStrings: string[]) {
  if (!dateStrings || dateStrings.length === 0) return 'BOTH'

  const parities = new Set(
    dateStrings.map((d) => (getISOWeek(parseISO(d)) % 2 === 1 ? 'ODD' : 'EVEN'))
  )

  if (parities.has('ODD') && parities.has('EVEN')) {
    return 'BOTH'
  }

  return parities.values().next().value
}
