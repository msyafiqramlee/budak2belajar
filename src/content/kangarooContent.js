// Kangaroo Math preparation content (Plan B).
// Levels follow the Kangaroo Math Malaysia categories for Sekolah Kebangsaan:
//   Year 1–2 = Écolier, Year 3–4 = Benjamin, Year 5–6 = Cadet.
// Every set is module-shaped ({ id, title, bm, steps }) so ModuleLesson can render it.
// Answers are stored at index 0; prepareStep shuffles them at play time.

export const KANGAROO_LEVELS = {
  'kangaroo-12': {
    id: 'kangaroo-12',
    navLabel: 'Kangaroo Year 1–2',
    category: 'Écolier',
    years: 'Year 1–2',
    minutes: 8,
    navSmall: 'Fun logic and counting puzzles',
    intro: 'Écolier-style puzzles: spot the pattern, count cleverly, and think one step ahead. Every question is a friendly brain teaser, not a school worksheet.',
    sets: [
      {
        id: 'kangaroo-12-set1',
        title: 'Warm-up A',
        bm: 'Pemanasan A',
        description: 'Patterns, counting tricks, and easy logic with small numbers.',
        steps: [
          { prompt: 'What number comes next?', expression: '2, 4, 6, 8, ?', options: ['10', '9', '12', '6'], answer: 0, points: 3, explain: 'The pattern adds 2 each time: 8 + 2 = 10.', hint: 'Count on two more from 8.' },
          { prompt: 'Five children stand in a line. Ali is 2nd from the front. Which place is he from the back?', options: ['4th', '3rd', '2nd', '5th'], answer: 0, points: 3, explain: 'Three children stand behind Ali, so he is 4th from the back.', hint: 'There are 3 children behind Ali.' },
          { prompt: 'How many wheels are there on 3 bicycles?', options: ['6', '3', '9', '12'], answer: 0, points: 3, explain: 'Each bicycle has 2 wheels, so 3 × 2 = 6 wheels.', hint: 'Each bicycle has 2 wheels.' },
          { prompt: 'A farmer has 4 cows and twice as many chickens. How many animals altogether?', options: ['12', '8', '6', '16'], answer: 0, points: 4, explain: 'Twice as many as 4 is 8 chickens, so 4 + 8 = 12 animals.', hint: 'Twice as many as 4 is 8.' },
          { prompt: 'What day is it two days after Monday?', options: ['Wednesday', 'Tuesday', 'Thursday', 'Sunday'], answer: 0, points: 3, explain: 'Tuesday is one day after Monday, so two days after is Wednesday.', hint: 'Tuesday is one day after Monday.' },
          { prompt: 'Six birds sit on a fence. 2 fly away, then 3 more come. How many birds are on the fence now?', options: ['7', '5', '8', '11'], answer: 0, points: 3, explain: '6 − 2 = 4, then 4 + 3 = 7 birds.', hint: 'First take away 2, then add 3.' },
          { prompt: 'Which number is the biggest?', expression: '17, 71, 27, 70', options: ['71', '70', '27', '17'], answer: 0, points: 3, explain: '71 has 7 tens, which is more than any other number here.', hint: 'Compare the tens digit first.' },
          { prompt: 'Mei has RM 1. A pen costs 60 sen. How much money does she have left?', options: ['40 sen', '50 sen', '60 sen', '4 sen'], answer: 0, points: 4, explain: 'RM 1 is 100 sen, and 100 − 60 = 40 sen.', hint: '100 sen − 60 sen.' },
          { prompt: 'Zara packs socks into pairs. How many pairs can she make with 10 socks?', options: ['5 pairs', '10 pairs', '2 pairs', '4 pairs'], answer: 0, points: 4, explain: 'Each pair needs 2 socks, so 10 ÷ 2 = 5 pairs.', hint: 'Count the socks two at a time.' },
          { prompt: 'What number completes the equation?', expression: '9 + ? = 15', options: ['6', '5', '7', '4'], answer: 0, points: 4, explain: 'Count from 9 up to 15: that is 6 steps.', hint: 'Count from 9 up to 15.' },
        ],
      },
      {
        id: 'kangaroo-12-set2',
        title: 'Warm-up B',
        bm: 'Pemanasan B',
        description: 'Shapes, money, time, and sharing puzzles with a twist.',
        steps: [
          { prompt: 'The pattern continues. What comes next?', expression: '● ○ ● ○ ● ?', options: ['○', '●', '△', '■'], answer: 0, points: 3, explain: 'The pattern switches between filled and empty circles, so next comes an empty circle.', hint: 'Say it out loud: filled, empty, filled, empty…' },
          { prompt: 'Kavin counts backwards: 20, 18, 16, … What number comes next?', options: ['14', '13', '12', '18'], answer: 0, points: 3, explain: 'The numbers count back in twos, so 16 − 2 = 14.', hint: 'Count back in twos.' },
          { prompt: 'There are 3 cats. Each cat has 4 legs. How many legs altogether?', options: ['12 legs', '7 legs', '8 legs', '16 legs'], answer: 0, points: 3, explain: '4 + 4 + 4 = 12 legs.', hint: 'Add 4 + 4 + 4.' },
          { prompt: 'A cake is cut into 8 equal slices. Aiman eats 3 slices. How many slices are left?', options: ['5 slices', '3 slices', '8 slices', '11 slices'], answer: 0, points: 3, explain: '8 − 3 = 5 slices are left.', hint: 'Take 3 away from 8.' },
          { prompt: 'Lina buys an 80 sen ice cream. She pays with three 50 sen coins. How much change does she get?', options: ['70 sen', '30 sen', '20 sen', '80 sen'], answer: 0, points: 4, explain: 'Three 50 sen coins make 150 sen, and 150 − 80 = 70 sen.', hint: '3 coins of 50 sen make 150 sen.' },
          { prompt: 'There are 5 boys and 4 girls in the reading corner. How many more boys are there than girls?', options: ['1', '2', '0', '9'], answer: 0, points: 3, explain: '5 − 4 = 1, so there is 1 more boy.', hint: 'Subtract: 5 − 4.' },
          { prompt: 'The clock shows 3 o’clock now. What will it show in 2 hours?', options: ['5 o’clock', '4 o’clock', '6 o’clock', '1 o’clock'], answer: 0, points: 3, explain: 'Two hours after 3 o’clock is 5 o’clock.', hint: 'Hop forward two numbers on the clock.' },
          { prompt: 'I am thinking of a number. It is more than 7 but less than 9. What is my number?', options: ['8', '7', '9', '6'], answer: 0, points: 3, explain: '8 is the only number between 7 and 9.', hint: 'Which number comes between 7 and 9?' },
          { prompt: 'How many sides do a triangle and a square have altogether?', options: ['7', '6', '5', '8'], answer: 0, points: 4, explain: 'A triangle has 3 sides and a square has 4, so 3 + 4 = 7.', hint: '3 sides + 4 sides.' },
          { prompt: 'Five children share 15 sweets equally. How many sweets does each child get?', options: ['3', '4', '5', '10'], answer: 0, points: 4, explain: '15 ÷ 5 = 3 sweets each.', hint: 'Share them one by one into 5 groups.' },
        ],
      },
    ],
  },
  'kangaroo-34': {
    id: 'kangaroo-34',
    navLabel: 'Kangaroo Year 3–4',
    category: 'Benjamin',
    years: 'Year 3–4',
    minutes: 10,
    navSmall: 'Pattern and logic challenges',
    intro: 'Benjamin-style challenges: multi-step thinking, number patterns, area and time puzzles that reward careful reading.',
    sets: [
      {
        id: 'kangaroo-34-set1',
        title: 'Challenge A',
        bm: 'Cabaran A',
        description: 'Doubling patterns, area, fractions, and multi-step word problems.',
        steps: [
          { prompt: 'What number comes next?', expression: '3, 6, 12, 24, ?', options: ['48', '36', '30', '32'], answer: 0, points: 3, explain: 'Each number doubles: 24 × 2 = 48.', hint: 'Each number doubles.' },
          { prompt: 'A rectangle is made of 2 identical squares. Each square has an area of 9 cm². What is the area of the rectangle?', options: ['18 cm²', '9 cm²', '36 cm²', '12 cm²'], answer: 0, points: 4, explain: 'Two identical squares of 9 cm² each make 9 + 9 = 18 cm².', hint: 'Add the two equal areas.' },
          { prompt: 'Nurul reads 12 pages every night. How many pages has she read after 7 nights?', options: ['84', '72', '96', '77'], answer: 0, points: 3, explain: '12 × 7 = 84 pages.', hint: 'Multiply 12 by 7.' },
          { prompt: 'In a class of 30 pupils, 18 are girls. How many more girls than boys are there?', options: ['6', '12', '8', '4'], answer: 0, points: 4, explain: 'There are 30 − 18 = 12 boys, and 18 − 12 = 6 more girls.', hint: 'Find the number of boys first: 30 − 18.' },
          { prompt: 'Two numbers add up to 20. One number is 4 more than the other. What is the smaller number?', options: ['8', '12', '10', '16'], answer: 0, points: 5, explain: 'Take away the extra 4, then share equally: (20 − 4) ÷ 2 = 8.', hint: 'Take away the extra 4, then share the rest equally.' },
          { prompt: 'Which fraction is the biggest?', expression: '1/2, 1/3, 2/3, 1/4', options: ['2/3', '1/2', '1/3', '1/4'], answer: 0, points: 4, explain: 'With the same-style whole, 2 out of 3 parts is more than any other choice here.', hint: 'Compare each fraction to one-half first.' },
          { prompt: 'A rope 24 m long is cut into 4 equal pieces. How long is each piece?', options: ['6 m', '4 m', '8 m', '12 m'], answer: 0, points: 3, explain: '24 ÷ 4 = 6 m per piece.', hint: 'Share 24 into 4 equal parts.' },
          { prompt: 'How many minutes pass from 2:45 to 3:20?', options: ['35 minutes', '25 minutes', '40 minutes', '45 minutes'], answer: 0, points: 4, explain: 'From 2:45 to 3:00 is 15 minutes, then 3:00 to 3:20 is 20 minutes: 15 + 20 = 35.', hint: '15 minutes to 3:00, then 20 more.' },
          { prompt: '60 oranges are packed into boxes of 8. How many boxes can be filled completely?', options: ['7 boxes', '8 boxes', '6 boxes', '68 boxes'], answer: 0, points: 4, explain: '8 × 7 = 56, so 7 boxes are full and 4 oranges are left over.', hint: 'How many eights fit into 60?' },
          { prompt: 'Aiman is 9 years old. His sister is 3 years older. What is the sum of their ages?', options: ['21', '18', '15', '24'], answer: 0, points: 4, explain: 'His sister is 9 + 3 = 12, and 9 + 12 = 21.', hint: 'Find the sister’s age first: 9 + 3.' },
        ],
      },
      {
        id: 'kangaroo-34-set2',
        title: 'Challenge B',
        bm: 'Cabaran B',
        description: 'Square numbers, race logic, money, and sharing with remainders.',
        steps: [
          { prompt: 'What number comes next?', expression: '1, 4, 9, 16, ?', options: ['25', '20', '24', '23'], answer: 0, points: 4, explain: 'These are square numbers: 1×1, 2×2, 3×3, 4×4, so next is 5×5 = 25.', hint: 'Try 1×1, 2×2, 3×3…' },
          { prompt: 'A kangaroo jumps 3 m with every hop. How many hops does it need to cross 27 m?', options: ['9', '8', '10', '24'], answer: 0, points: 3, explain: '27 ÷ 3 = 9 hops.', hint: 'How many threes make 27?' },
          { prompt: '2 erasers cost RM 3. How much do 6 erasers cost?', options: ['RM 9', 'RM 6', 'RM 12', 'RM 18'], answer: 0, points: 4, explain: '6 erasers is 3 groups of 2, so 3 × RM 3 = RM 9.', hint: '6 erasers is 3 groups of 2.' },
          { prompt: 'How many two-digit numbers can you make using only the digits 1 and 2? You may repeat digits.', options: ['4', '2', '6', '8'], answer: 0, points: 5, explain: 'The numbers are 11, 12, 21 and 22, so there are 4.', hint: 'Try the tens digit 1 first, then 2.' },
          { prompt: 'A square has sides of 5 cm. What is its perimeter?', options: ['20 cm', '10 cm', '25 cm', '15 cm'], answer: 0, points: 3, explain: 'All 4 sides are equal, so 4 × 5 = 20 cm.', hint: 'Perimeter = 4 equal sides.' },
          { prompt: 'In a race, Cita finished before Ali, and Ali finished before Ben. Who won the race?', options: ['Cita', 'Ali', 'Ben', 'Cannot tell'], answer: 0, points: 4, explain: 'Finishing before everyone else means winning, so Cita won.', hint: 'Follow who finished before whom.' },
          { prompt: 'A film starts at 4:15 pm and lasts 1 hour 40 minutes. What time does it end?', options: ['5:55 pm', '5:45 pm', '6:05 pm', '5:50 pm'], answer: 0, points: 4, explain: '4:15 plus 1 hour is 5:15, plus 40 minutes is 5:55 pm.', hint: 'Add 1 hour first, then 40 minutes.' },
          { prompt: 'What number times itself gives 49?', options: ['7', '8', '6', '14'], answer: 0, points: 3, explain: '7 × 7 = 49.', hint: 'Try 7 × 7.' },
          { prompt: '25 marbles are shared among 4 boys as equally as possible. How many marbles are left over?', options: ['1 marble', '6 marbles', '4 marbles', '2 marbles'], answer: 0, points: 4, explain: '4 × 6 = 24, so each boy gets 6 and 1 marble is left over.', hint: '4 × 6 = 24.' },
          { prompt: 'How many halves make 3 wholes?', options: ['6', '3', '4', '8'], answer: 0, points: 3, explain: 'Each whole has 2 halves, so 3 × 2 = 6 halves.', hint: 'Each whole has 2 halves.' },
        ],
      },
    ],
  },
  'kangaroo-56': {
    id: 'kangaroo-56',
    navLabel: 'Kangaroo Year 5–6',
    category: 'Cadet',
    years: 'Year 5–6',
    minutes: 12,
    navSmall: 'Multi-step exam-style problems',
    intro: 'Cadet-style problems: ratios, averages, speed, and logic questions that take two or three careful steps to solve.',
    sets: [
      {
        id: 'kangaroo-56-set1',
        title: 'Master A',
        bm: 'Mahir A',
        description: 'Ratios, averages, percentages, and two-step number puzzles.',
        steps: [
          { prompt: 'A necklace has red and blue beads in the ratio 3 : 5. There are 40 beads altogether. How many red beads are there?', options: ['15', '25', '24', '8'], answer: 0, points: 4, explain: '3 + 5 = 8 parts, each part is 40 ÷ 8 = 5 beads, so red = 3 × 5 = 15.', hint: '3 + 5 = 8 parts make 40 beads.' },
          { prompt: 'The average of 4 numbers is 12. One number is removed, and the average of the remaining 3 numbers is 10. Which number was removed?', options: ['18', '12', '14', '10'], answer: 0, points: 5, explain: 'The first total is 4 × 12 = 48. The new total is 3 × 10 = 30. The removed number is 48 − 30 = 18.', hint: 'Find both totals: 4 × 12 and 3 × 10.' },
          { prompt: 'A square has an area of 49 cm². What is its perimeter?', options: ['28 cm', '14 cm', '49 cm', '21 cm'], answer: 0, points: 4, explain: 'The side is 7 cm because 7 × 7 = 49, so the perimeter is 4 × 7 = 28 cm.', hint: 'Which number times itself is 49?' },
          { prompt: 'Two-thirds of a number is 18. What is the number?', expression: '2/3 × ? = 18', options: ['27', '12', '24', '36'], answer: 0, points: 4, explain: 'One-third of the number is 9, so the number is 3 × 9 = 27.', hint: 'One-third of the number is 9.' },
          { prompt: 'A bag costs RM 50. The shop gives a 20% discount. What is the new price?', options: ['RM 40', 'RM 30', 'RM 45', 'RM 38'], answer: 0, points: 3, explain: '20% of RM 50 is RM 10, so the new price is RM 50 − RM 10 = RM 40.', hint: '10% of RM 50 is RM 5.' },
          { prompt: 'A car travels 180 km in 3 hours. At the same speed, how far does it travel in 5 hours?', options: ['300 km', '240 km', '360 km', '150 km'], answer: 0, points: 4, explain: 'The speed is 180 ÷ 3 = 60 km per hour, so in 5 hours it travels 5 × 60 = 300 km.', hint: 'Find the distance for one hour first.' },
          { prompt: 'Two numbers multiply to 36 and add up to 13. What is the larger number?', options: ['9', '4', '13', '6'], answer: 0, points: 5, explain: '9 × 4 = 36 and 9 + 4 = 13, so the larger number is 9.', hint: 'List the pairs that multiply to 36.' },
          { prompt: 'What number comes next?', expression: '2, 3, 5, 8, 12, ?', options: ['17', '16', '15', '18'], answer: 0, points: 4, explain: 'The gaps grow: +1, +2, +3, +4, so add +5: 12 + 5 = 17.', hint: 'Look at the gaps: +1, +2, +3, +4.' },
          { prompt: 'A watch runs 5 minutes fast every hour. It is set correctly at 6 am. What time does the watch show when the real time is 10 am?', options: ['10:20', '10:05', '10:15', '10:25'], answer: 0, points: 5, explain: '4 hours have passed, so the watch is 4 × 5 = 20 minutes fast: it shows 10:20.', hint: '4 hours have passed, 5 minutes fast each hour.' },
          { prompt: 'Aiman shares 35 sweets: he keeps twice as many as Ben, and Ben keeps twice as many as Cita. How many sweets does Cita get?', options: ['5', '10', '20', '7'], answer: 0, points: 5, explain: 'Count in parts of Cita: Cita + 2 × Cita + 4 × Cita = 7 parts = 35, so Cita gets 5.', hint: 'Count everyone in parts of Cita.' },
        ],
      },
      {
        id: 'kangaroo-56-set2',
        title: 'Master B',
        bm: 'Mahir B',
        description: 'Geometry, working backwards, and classic competition brainteasers.',
        steps: [
          { prompt: 'The angles of a triangle are x, 2x and 3x. What is the largest angle?', options: ['90°', '60°', '30°', '120°'], answer: 0, points: 4, explain: 'x + 2x + 3x = 180°, so x = 30° and the largest angle is 3 × 30° = 90°.', hint: 'All three angles make 180°.' },
          { prompt: 'Aiman spends half of his money on a book, then one-third of what is left on lunch. He has RM 10 left. How much did he start with?', options: ['RM 30', 'RM 20', 'RM 45', 'RM 15'], answer: 0, points: 5, explain: 'Before lunch he had RM 15, because 15 − (1/3 × 15) = 10. Before the book he had RM 30. Work backwards!', hint: 'Work backwards from the RM 10.' },
          { prompt: 'What is 1 + 2 + 3 + … + 10?', options: ['55', '50', '45', '110'], answer: 0, points: 4, explain: 'Pair the ends: 1+10, 2+9, 3+8, 4+7, 5+6 — five pairs of 11 make 55.', hint: 'Pair the first and last: 1+10, 2+9…' },
          { prompt: 'A big cube box is filled with 27 small cubes. How many small cubes sit along each edge?', options: ['3', '9', '27', '6'], answer: 0, points: 3, explain: '3 × 3 × 3 = 27, so 3 cubes fit along each edge.', hint: '3 × 3 × 3 = 27.' },
          { prompt: 'In a class of 40 pupils, 55% are girls. How many boys are there?', options: ['18', '22', '20', '16'], answer: 0, points: 4, explain: '55% of 40 is 22 girls, so 40 − 22 = 18 boys.', hint: '10% of 40 is 4 pupils.' },
          { prompt: 'If 5 machines make 5 toys in 5 minutes, how long do 100 machines need to make 100 toys?', options: ['5 minutes', '100 minutes', '20 minutes', '1 minute'], answer: 0, points: 5, explain: 'One machine makes one toy in 5 minutes, so 100 machines make 100 toys in the same 5 minutes.', hint: 'One machine makes one toy in 5 minutes.' },
          { prompt: 'I am a two-digit number. My digits add up to 9, and my tens digit is twice my units digit. What number am I?', options: ['63', '36', '72', '81'], answer: 0, points: 5, explain: 'In 63, the digits add to 9 and 6 is twice 3.', hint: 'Try tens = 6: what units digit makes the sum 9?' },
          { prompt: 'A rectangle measures 10 cm by 6 cm. A square has the same perimeter. What is the side of the square?', options: ['8 cm', '16 cm', '4 cm', '6 cm'], answer: 0, points: 4, explain: 'The perimeter is 2 × (10 + 6) = 32 cm, so each side of the square is 32 ÷ 4 = 8 cm.', hint: 'Perimeter is 2 × (10 + 6).' },
          { prompt: 'If today is Wednesday, what day will it be in 100 days?', options: ['Friday', 'Thursday', 'Saturday', 'Monday'], answer: 0, points: 5, explain: '100 = 14 weeks + 2 days, so it is 2 days after Wednesday: Friday.', hint: 'How many full weeks are in 100 days?' },
          { prompt: 'Aiman has RM 5. He buys 3 books at RM 1.20 each. How much change does he get?', options: ['RM 1.40', 'RM 2.40', 'RM 1.60', 'RM 3.80'], answer: 0, points: 4, explain: 'The books cost 3 × RM 1.20 = RM 3.60, and RM 5 − RM 3.60 = RM 1.40.', hint: 'Three books cost 3 × RM 1.20.' },
        ],
      },
    ],
  },
}

export function buildKangarooMock(levelId) {
  const level = KANGAROO_LEVELS[levelId]
  const steps = []
  for (let round = 0; round < 5 && steps.length < 10; round += 1) {
    level.sets.forEach((set) => {
      if (set.steps[round] && steps.length < 10) steps.push(set.steps[round])
    })
  }
  return {
    id: `${levelId}-mock`,
    title: `${level.years} mock paper`,
    bm: 'Kertas ujian',
    steps,
  }
}
