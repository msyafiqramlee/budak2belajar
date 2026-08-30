import { useState } from 'react'
import Clock from './Clock.jsx'

const TRANSLATION_STEPS = [
  {
    direction: 'Analog → Digital',
    type: 'read',
    prompt: 'Look at the clock. Which digital time matches it?',
    clock: { hour: 3, minute: 19 },
    options: ['3:19', '3:15', '4:19', '9:03'],
    answer: 0,
    explain: 'The short hand has passed 3. The long hand is 4 ticks after 15, so it is 3:19.',
    hint: 'Read the hour first. Then count from the nearest five-minute landmark: 15 + 4.',
  },
  {
    direction: 'Analog → Digital',
    type: 'read',
    prompt: 'Which digital time matches this clock?',
    clock: { hour: 6, minute: 23 },
    options: ['6:23', '6:20', '7:23', '3:26'],
    answer: 0,
    explain: 'The hour is 6. The long hand is 3 ticks after 20, making 23 minutes.',
    hint: 'The long hand is on 4, which means 20, then count 3 tiny ticks.',
  },
  {
    direction: 'Digital → Analog',
    type: 'choose',
    prompt: 'Which clock shows 4:39?',
    clock: { hour: 4, minute: 39 },
    options: ['Short hand past 4; long hand 4 ticks after 7', 'Short hand on 5; long hand on 4', 'Short hand past 3; long hand on 8', 'Short hand on 4; long hand on 9'],
    answer: 0,
    explain: 'At 4:39, the short hand has passed 4 and the long hand is 4 ticks after 35.',
    hint: 'Find 39: start at 35 on number 7, then count four tiny ticks.',
  },
  {
    direction: 'Digital → Analog',
    type: 'choose',
    prompt: 'Where should the long hand point for 2:45?',
    clock: { hour: 2, minute: 45 },
    options: ['9', '3', '6', '12'],
    answer: 0,
    explain: 'Forty-five minutes is three-quarters around the clock, at number 9.',
    hint: 'Count by fives: 5, 10, 15… 45 lands on 9.',
  },
]

const TRANSLATION_CHEERS = ['Great translating!', 'You read both clock languages!', 'That clock-to-digital match is spot on!']

const STEPS = [
  {
    section: 1,
    sectionTitle: 'Hands and whole hours',
    type: 'tap',
    target: 'hour',
    prompt: 'Tap the short hour hand.',
    hint: 'It is shorter and moves slowly around the clock.',
    explain: 'The short hand tells us the hour (jam)!',
    clock: { hour: 7, minute: 20 },
  },
  {
    section: 1,
    sectionTitle: 'Hands and whole hours',
    type: 'tap',
    target: 'minute',
    prompt: 'Now tap the long minute hand.',
    hint: 'It reaches closer to the minute ticks around the edge.',
    explain: 'The long hand tells us the minutes (minit)!',
    clock: { hour: 4, minute: 50 },
  },
  {
    section: 1,
    sectionTitle: 'Hands and whole hours',
    type: 'quiz',
    prompt: 'The long hand is on 12 (:00) and the short hand is on 3. What time is it?',
    options: ["3 o'clock", "6 o'clock", "12 o'clock", "9 o'clock"],
    answer: 0,
    explain: "The short hand is on 3, so it is 3 o'clock.",
    tryAgain: 'Read the short dark hand when the long hand is at :00.',
    clock: { hour: 3, minute: 0 },
    showMinuteLabels: true,
    reveal: 'hour',
    visualNote: 'At the top of the clock, 12 means :00 minutes.',
  },
  {
    section: 2,
    sectionTitle: 'Quarter hours and five-minute hops',
    type: 'quiz',
    prompt: 'The long hand points to 3. What special time does that show?',
    options: [':15 — quarter past', ':30 — half past', ':45 — quarter to', ':05 — five past'],
    answer: 0,
    explain: 'The long hand on 3 shows 15 minutes, or quarter past.',
    tryAgain: 'Number 3 is three groups of five: 3 × 5 = 15 minutes.',
    clock: { hour: 4, minute: 15 },
    showMinuteLabels: true,
    reveal: 'minute',
    visualNote: 'Quarter past means 15 minutes after the hour.',
  },
  {
    section: 2,
    sectionTitle: 'Quarter hours and five-minute hops',
    type: 'quiz',
    prompt: 'The long hand points to 9. What special time does that show?',
    options: [':45 — quarter to', ':15 — quarter past', ':30 — half past', ':05 — five past'],
    answer: 0,
    explain: 'The long hand on 9 shows 45 minutes, or quarter to the next hour.',
    tryAgain: 'Count by fives to 9: 5, 10, 15, 20, 25, 30, 35, 40, 45.',
    clock: { hour: 7, minute: 45 },
    showMinuteLabels: true,
    reveal: 'minute',
    visualNote: 'Quarter to means 15 minutes before the next hour.',
  },
  {
    section: 2,
    sectionTitle: 'Quarter hours and five-minute hops',
    type: 'quiz',
    prompt: 'The clock shows 2:10. What happens after 5 more minutes?',
    options: ['2:15 — quarter past', '2:05', '3:10', '2:20'],
    answer: 0,
    explain: 'Five minutes after 2:10 is 2:15, which is quarter past 2.',
    tryAgain: 'Move forward five minutes: 10, then 15.',
    clock: { hour: 2, minute: 10 },
    showMinuteLabels: true,
    reveal: 'minute',
    visualNote: 'A time journey moves the minute hand forward around the clock.',
  },
  {
    section: 2,
    sectionTitle: 'Minutes by five',
    type: 'quiz',
    prompt: 'One full trip around the clock equals how many minutes?',
    options: ['60 minutes', '12 minutes', '30 minutes', '100 minutes'],
    answer: 0,
    explain: 'One complete trip around the clock is 60 minutes.',
    tryAgain: 'Follow the orange minute labels from 00 all the way around to 55.',
    clock: { hour: 12, minute: 0 },
    showMinuteLabels: true,
    visualNote: 'There are 60 small minute ticks in one complete circle.',
  },
  {
    section: 2,
    sectionTitle: 'Minutes by five',
    type: 'quiz',
    prompt: 'The long hand points to 1. How many minutes is that?',
    options: [':05 minutes', ':01 minute', ':10 minutes', ':15 minutes'],
    answer: 0,
    explain: 'The first numbered stop is 5 minutes.',
    tryAgain: 'Use the orange minute label beside clock number 1.',
    clock: { hour: 8, minute: 5 },
    showMinuteLabels: true,
    reveal: 'minute',
    visualNote: 'Each numbered stop adds 5 minutes: 00, 05, 10, 15…',
  },
  {
    section: 2,
    sectionTitle: 'Minutes by five',
    type: 'quiz',
    prompt:
      'The long hand points to 3. Count by fives. How many minutes?',
    options: [':15 minutes', ':05 minutes', ':30 minutes', ':45 minutes'],
    answer: 0,
    explain: 'Number 3 × 5 = 15 minutes!',
    tryAgain: 'Count the numbered stops: 5, 10, 15.',
    clock: { hour: 2, minute: 15 },
    showMinuteLabels: true,
    reveal: 'minute',
    visualNote: '1 → 05, 2 → 10, 3 → 15.',
  },
  {
    section: 2,
    sectionTitle: 'Minutes by five',
    type: 'quiz',
    prompt: 'The labels are hidden now. What does the long hand on 7 mean?',
    options: [':35 minutes', ':07 minutes', ':30 minutes', ':40 minutes'],
    answer: 0,
    explain: 'Seven groups of five make 35 minutes.',
    tryAgain: 'Count by fives around the clock until you reach 7.',
    clock: { hour: 5, minute: 35 },
    reveal: 'minute',
    visualNote: '5, 10, 15, 20, 25, 30, 35.',
  },
  {
    section: 3,
    sectionTitle: 'Exact minutes and moving hours',
    type: 'quiz',
    prompt: 'The long hand is 4 small ticks after :15. What minute is it?',
    options: [':19 minutes', ':15 minutes', ':04 minutes', ':20 minutes'],
    answer: 0,
    explain: 'Start at 15, then count 16, 17, 18, 19.',
    tryAgain: 'Each small tick is 1 minute. Count four ticks after 15.',
    clock: { hour: 3, minute: 19 },
    showMinuteLabels: true,
    highlightMinute: 19,
    reveal: 'minute',
    visualNote: '15 + 4 small ticks = 19 minutes.',
  },
  {
    section: 3,
    sectionTitle: 'Exact minutes and moving hours',
    type: 'quiz',
    prompt: 'The short hand has passed 2 but has not reached 3. Which hour is it?',
    options: ['2', '3', '9', '45'],
    answer: 0,
    explain: 'Use the hour the short hand has already passed: 2.',
    tryAgain: 'The short hand moves slowly. Read the number it has already passed.',
    clock: { hour: 2, minute: 45 },
    reveal: 'hour',
    visualNote: 'At 2:45, the short hand is close to 3, but the hour is still 2.',
  },
  {
    section: 3,
    sectionTitle: 'Exact minutes and moving hours',
    type: 'quiz',
    prompt: 'Final check: what time does this clock show?',
    options: ['4:33', '5:33', '4:35', '7:20'],
    answer: 0,
    explain: 'The hour hand has passed 4, and the minute hand shows :33.',
    tryAgain: 'Read the hour already passed, then count the minute ticks.',
    clock: { hour: 4, minute: 33 },
    highlightMinute: 33,
    visualNote: 'Read the short hand first, then the long hand.',
  },
]

export function TranslationQuiz({ onBack }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [wrong, setWrong] = useState(false)
  const current = TRANSLATION_STEPS[step]
  const solved = selected === current.answer

  function choose(index) {
    if (solved) return
    setSelected(index)
    setWrong(index !== current.answer)
  }

  function next() {
    setStep((value) => (value + 1) % TRANSLATION_STEPS.length)
    setSelected(null)
    setWrong(false)
  }

  return (
    <section className="card translation-card">
      <div className="hud">
        <button className="back-btn" onClick={onBack}>⬅ Back</button>
        <div className="lesson-position">
          <span className="eyebrow dark">Clock translation</span>
          <strong>{current.direction}</strong>
        </div>
      </div>
      <div className="translation-route" aria-label="Translation direction">
        <span className={current.direction === 'Analog → Digital' ? 'active' : ''}>◷ Analog</span>
        <span>↔</span>
        <span className={current.direction === 'Digital → Analog' ? 'active' : ''}>Digital time</span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuemin="1" aria-valuemax={TRANSLATION_STEPS.length} aria-valuenow={step + 1} aria-label="Translation quiz progress">
        <div className="progress-fill" style={{ width: `${((step + 1) / TRANSLATION_STEPS.length) * 100}%` }} />
      </div>
      <p className="quiz-level-label">Mission {step + 1} of {TRANSLATION_STEPS.length}</p>
      <h2 className="question">{current.prompt}</h2>
      <div className="clock-container">
        <Clock hour={current.clock.hour} minute={current.clock.minute} showMinuteLabels reveal="minute" highlightMinute={current.clock.minute} />
      </div>
      {!solved && <p className="hint">{wrong ? `Almost there! ${current.hint}` : current.hint}</p>}
      <div className="choices single-col translation-choices">
        {current.options.map((option, index) => (
          <button key={option} className={`choice-btn ${solved && index === current.answer ? 'correct' : ''} ${wrong && index === selected ? 'wrong' : ''}`} disabled={solved} onClick={() => choose(index)}>{option}</button>
        ))}
      </div>
      <p id="feedback" role="status" aria-live="polite" className={wrong ? 'bad' : solved ? 'good' : ''}>
        {solved ? `🌟 ${TRANSLATION_CHEERS[step % TRANSLATION_CHEERS.length]} ${current.explain}` : ''}
      </p>
      {solved && <button className="next-btn" onClick={next}>{step === TRANSLATION_STEPS.length - 1 ? 'Play again →' : 'Next translation →'}</button>}
    </section>
  )
}

function Tutorial({ onStart, onBack, onTranslation }) {
  const [step, setStep] = useState(0)
  const [tapWrong, setTapWrong] = useState(false)
  const [wrongChoice, setWrongChoice] = useState(null)
  const [solved, setSolved] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [outcomes, setOutcomes] = useState([])
  const [showSummary, setShowSummary] = useState(false)

  const current = STEPS[step]

  function succeed() {
    if (solved) return
    setSolved(true)
    setTapWrong(false)
    setWrongChoice(null)
    setOutcomes((currentOutcomes) => {
      if (currentOutcomes.length > step) return currentOutcomes
      const nextOutcomes = [
        ...currentOutcomes,
        {
          prompt: current.prompt,
          correctFirstTry: mistakes === 0,
        },
      ]
      if (onProgress) onProgress('clock-hands', nextOutcomes.length === STEPS.length && nextOutcomes.filter((outcome) => outcome.correctFirstTry).length >= Math.ceil(STEPS.length * 0.8) ? 'Mastered' : 'Practising')
      return nextOutcomes
    })
  }

  function next() {
    setSolved(false)
    setTapWrong(false)
    setWrongChoice(null)
    setMistakes(0)
    setStep((s) => s + 1)
  }

  function registerTapMistake() {
    setTapWrong(true)
    setMistakes((count) => count + 1)
  }

  function handleQuizPick(index) {
    if (solved) return
    if (index === current.answer) {
      succeed()
    } else {
      setWrongChoice(index)
      setMistakes((count) => count + 1)
    }
  }

  function restartLesson() {
    setStep(0)
    setTapWrong(false)
    setWrongChoice(null)
    setSolved(false)
    setMistakes(0)
    setOutcomes([])
    setShowSummary(false)
  }

  const isLast = step === STEPS.length - 1
  const madeMistake = tapWrong || wrongChoice !== null

  if (showSummary) {
    const firstTryCount = outcomes.filter(
      (outcome) => outcome.correctFirstTry,
    ).length
    const successRate = Math.round((firstTryCount / STEPS.length) * 100)

    return (
      <section className="card session-summary">
        <span className="eyebrow dark">Clock quest complete! 🎉</span>
        <h2>You did it!</h2>
        <p className="summary-intro">
          You finished all {STEPS.length} clock missions. Look at your stars to see the ideas you already know well.
        </p>

        <div className="summary-score-grid">
          <div className="summary-score primary">
            <strong>{successRate}%</strong>
            <span>First-attempt success</span>
          </div>
          <div className="summary-score">
            <strong>{firstTryCount}/{STEPS.length}</strong>
            <span>Correct without help</span>
          </div>
          <div className="summary-score">
            <strong>{STEPS.length - firstTryCount}</strong>
            <span>Completed with support</span>
          </div>
        </div>

        <div className="result-review">
          <h3>Step review</h3>
          <ol>
            {outcomes.map((outcome, index) => (
              <li key={`${outcome.prompt}-${index}`}>
                <span className="result-number">{index + 1}</span>
                <span className="result-question">{outcome.prompt}</span>
                <span
                  className={`result-status ${
                    outcome.correctFirstTry ? 'success' : 'supported'
                  }`}
                >
                  {outcome.correctFirstTry ? 'First try' : 'With support'}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="summary-actions">
          <button className="primary-action" onClick={onStart}>
            Keep playing →
          </button>
          <button className="secondary-action bordered" onClick={onTranslation}>
            Translate clocks ↔
          </button>
          <button className="secondary-action bordered" onClick={restartLesson}>
            Play it again
          </button>
          <button className="text-action" onClick={onBack}>
            Back to learning path
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="card">
      <div className="hud">
        <button className="back-btn" onClick={onBack}>
          ⬅ Back
        </button>
        <div className="lesson-position">
          <span className="eyebrow dark">Mission {current.section} · {current.sectionTitle}</span>
          <strong>Step {Math.min(step + 1, STEPS.length)} / {STEPS.length}</strong>
        </div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Lesson progress"
        aria-valuemin="1"
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
      >
        <div
          className="progress-fill"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {current.type === 'tap' ? (
        <>
          <h2 className="question">{current.prompt}</h2>
          {!solved && <p className="hint">{current.hint}</p>}
          <div className="clock-container">
            <Clock
              hour={current.clock.hour}
              minute={current.clock.minute}
              onHourClick={
                current.target === 'hour'
                  ? () => succeed()
                  : registerTapMistake
              }
              onMinuteClick={
                current.target === 'minute'
                  ? () => succeed()
                  : registerTapMistake
              }
              reveal={solved ? current.target : null}
              showMinuteLabels={current.showMinuteLabels}
              highlightMinute={current.highlightMinute}
            />
          </div>
          {current.visualNote && solved && (
            <p className="visual-note">{current.visualNote}</p>
          )}
        </>
      ) : (
        <>
          <h2 className="question">{current.prompt}</h2>
          {current.clock && (
            <div className="clock-container">
              <Clock
                hour={current.clock.hour}
                minute={current.clock.minute}
                reveal={current.reveal}
                showMinuteLabels={current.showMinuteLabels}
                highlightMinute={current.highlightMinute}
              />
            </div>
          )}
          {current.visualNote && solved && (
            <p className="visual-note">{current.visualNote}</p>
          )}
          <div className="choices single-col">
            {current.options.map((option, index) => (
              <button
                key={option}
                className={
                  'choice-btn' +
                  (solved && index === current.answer ? ' correct' : '') +
                  (wrongChoice === index ? ' wrong' : '')
                }
                disabled={solved}
                onClick={() => handleQuizPick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      <p
        id="feedback"
        role="status"
        aria-live="polite"
        className={madeMistake ? 'bad' : solved ? 'good' : ''}
      >
        {solved
          ? `🌟 Fantastic! ${current.explain}`
          : madeMistake
            ? `Almost there! ${current.tryAgain || 'Look carefully and try again.'}`
            : ''}
      </p>

      {solved &&
        (isLast ? (
          <button className="next-btn" onClick={() => setShowSummary(true)}>
            View my star chart →
          </button>
        ) : (
          <button className="next-btn" onClick={next}>
            Next mission ➡
          </button>
        ))}
    </section>
  )
}

export default Tutorial
