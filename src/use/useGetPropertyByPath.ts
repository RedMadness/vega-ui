export default function(object: Record<string, unknown>, path: string) {
  let current: unknown = object
  for (const key of path.split('.')) {
    current = (current as Record<string, unknown>)?.[key] ?? ''
  }

  return current
}