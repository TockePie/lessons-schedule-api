export function formatTeacherName(
  fullName: string | null | undefined
): string | null {
  if (!fullName) return null

  const parts = fullName.trim().split(/\s+/)

  if (parts.length === 1) return parts[0]

  const [lastName, firstName] = parts
  const initial = firstName ? `${firstName.charAt(0)}.` : ''

  return `${lastName} ${initial}`.trim()
}
