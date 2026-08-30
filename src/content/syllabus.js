const SKILL_STATUSES = ['New', 'Practising', 'Mastered']

import { KANGAROO_LEVELS } from './kangarooContent.js'

const KANGAROO_SKILLS = Object.fromEntries(
  Object.values(KANGAROO_LEVELS).map((level) => [
    level.id,
    [
      ...level.sets.map((set) => ({
        id: set.id,
        title: `${set.title} · ${level.category}`,
        year: level.years,
        status: 'New',
        description: set.description,
      })),
      { id: `${level.id}-mock`, title: `${level.years} mock paper`, year: level.years, status: 'New', description: `A timed 10-question paper mixing every ${level.category} set.` },
    ],
  ]),
)

export const TOPIC_SKILLS = {
  clock: [
    { id: 'clock-hands', title: 'Meet the clock hands', year: 'Year 1', status: 'Practising', description: 'Tell the short hour hand from the long minute hand.' },
    { id: 'clock-hours', title: 'O’clock and half past', year: 'Year 1', status: 'New', description: 'Read whole hours and half hours with confidence.' },
    { id: 'clock-quarter', title: 'Quarter past and quarter to', year: 'Year 2', status: 'New', description: 'Recognise :15 and :45 as quarter-hour landmarks.' },
    { id: 'clock-translation', title: 'Analog ↔ digital time', year: 'Year 2', status: 'New', description: 'Translate clock pictures into digital times and back again.' },
    { id: 'clock-five', title: 'Five-minute hops', year: 'Year 2', status: 'New', description: 'Count around the clock in five-minute jumps.' },
    { id: 'clock-exact', title: 'Exact minute detective', year: 'Year 2', status: 'New', description: 'Count the small ticks to read any minute.' },
    { id: 'clock-elapsed', title: 'Time journeys', year: 'Year 3', status: 'New', description: 'Compare times and work out simple durations.' },
  ],
  operations: [
    { id: 'operations-count', title: 'Counting and number bonds', year: 'Year 1', status: 'Mastered', description: 'Build numbers and make friendly pairs to 10.' },
    { id: 'operations-add', title: 'Addition adventures', year: 'Year 1', status: 'Practising', description: 'Join groups and add within 20.' },
    { id: 'operations-subtract', title: 'Subtraction stories', year: 'Year 1', status: 'New', description: 'Take away, compare, and find what is missing.' },
    { id: 'operations-place', title: 'Tens and ones', year: 'Year 2', status: 'New', description: 'Understand place value before larger calculations.' },
    { id: 'operations-multiply', title: 'Equal groups', year: 'Year 2', status: 'New', description: 'See multiplication as groups and arrays.' },
    { id: 'operations-divide', title: 'Fair sharing', year: 'Year 2', status: 'New', description: 'Share and group objects equally.' },
    { id: 'operations-word', title: 'Mixed word problems', year: 'Year 3', status: 'New', description: 'Choose the right operation for real-life stories.' },
  ],
  fractions: [
    { id: 'fractions-parts', title: 'Whole and equal parts', year: 'Year 2', status: 'New', description: 'Split shapes and sets into equal parts.' },
    { id: 'fractions-language', title: 'Fraction words', year: 'Year 2', status: 'New', description: 'Use numerator and denominator with models.' },
    { id: 'fractions-numberline', title: 'Fractions on a number line', year: 'Year 3', status: 'New', description: 'Place fractions between zero and one whole.' },
    { id: 'fractions-equivalent', title: 'Equivalent fractions', year: 'Year 3', status: 'New', description: 'Spot different names for the same amount.' },
    { id: 'fractions-compare', title: 'Compare fractions', year: 'Year 3', status: 'New', description: 'Decide which fraction is bigger and explain why.' },
    { id: 'fractions-add', title: 'Add and subtract like fractions', year: 'Year 3', status: 'New', description: 'Combine parts with the same denominator.' },
    { id: 'fractions-advanced', title: 'Advanced fraction operations', year: 'Year 4+', status: 'New', description: 'Multiply and divide fractions when the foundations are ready.' },
  ],
  ...KANGAROO_SKILLS,
}

export function getStatusCounts(topic) {
  return TOPIC_SKILLS[topic].reduce((counts, skill) => {
    counts[skill.status] += 1
    return counts
  }, { New: 0, Practising: 0, Mastered: 0 })
}

export function getNextSkill(topic) {
  return TOPIC_SKILLS[topic].find((skill) => skill.status !== 'Mastered') || TOPIC_SKILLS[topic][0]
}

export { SKILL_STATUSES }
