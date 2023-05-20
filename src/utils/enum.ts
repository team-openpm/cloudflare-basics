/**
 * Converts string to enum. Returns undefined if enum doesn't contain the value.
 *
 */
export function enumFromString<T>(
  enm: { [s: string]: T },
  value: string | undefined | null
): T {
  if (!value) {
    throw new Error('Value is undefined or null')
  }

  const validValues = Object.values(enm) as unknown as string[]
  const isValid = validValues.includes(value)

  if (isValid) {
    return value as unknown as T
  } else {
    throw new Error(`Invalid value: ${value}`)
  }
}
