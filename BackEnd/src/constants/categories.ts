export const CATEGORIES = [
  'Bug Report',
  'Feature Request',
  'General Feedback',
  'Support',
] as const

export type Category = (typeof CATEGORIES)[number]
