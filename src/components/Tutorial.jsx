import { useState } from 'react'
import Clock from './Clock.jsx'

const STEPS = [
  {
    type: 'tap',
    target: 'hour',
    prompt: 'Tap the SHORT hand! 👆',
    hint: 'The short one is the little guy!',
    clock: { hour: 7, minute: 20 },
  },
  {
    type: 'quiz',
    prompt: 'Nice! The SHORT hand tells us the...',
    options: ['Hour (jam) 🐢', 'Minute (minit) 🐇'],
    answer: 0,
    explain: 'Short & slow = HOURS (jam)!',
  },
  {
    type: 'tap',
    target: 'minute',
    prompt: 'Now tap the LONG hand! 👆',
    hint: 'The long one stretches far out!',
    clock: { hour: 4, minute: 50 },
  },
  {
    type: 'quiz',
    prompt: 'Great! The LONG hand tells us the...',
    options: ['Minute (minit) 🐇', 'Hour (jam) 🐢'],
    answer: 0,
    explain: 'Long & fast = MINUTES (minit)!',
  },
  {
    type: 'quiz',
    prompt: 'Look! The short hand points to 3. What time is it?',
    options: ["3 o'clock", "6 o'clock", "12 o'clock", "9 o'clock"],
    answer: 0,
    explain: "Short hand on 3 → it's 3 o'clock!",
    clock: { hour: 3, minute: 0 },
    reveal: 'hour',
  },
  {
    type: 'quiz',
    prompt:
      'The long hand points to 3. Each number counts 5 minutes. How many minutes?',
    options: [':15 minutes', ':05 minutes', ':30 minutes', ':45 minutes'],
    answer: 0,
    explain: 'Number 3 × 5 = 15 minutes!',
    clock: { hour: 2, minute: 15 },
    reveal: 'minute',
  },
]

function Tutorial({ onStart, onBack }) {
  const [step, setStep] = useState(0)
  const [wrong, setWrong] = useState(false)
  const [solved, setSolved] = useState(false)

  const current = STEPS[step]

  function succeed() {
    setSolved(true)
    setWrong(false)
  }

  function next() {
    setSolved(false)
    setWrong(false)
    setStep((s) => s + 1)
  }

  function handleQuizPick(index) {
    if (solved) return
    if (index === current.answer) {
      succeed()
    } else {
      setWrong(true)
    }
  }

  const isLast = step === STEPS.length - 1

  return (
    <section className="card">
      <div className="hud">
        <button className="back-btn" onClick={onBack}>
          ⬅ Back
        </button>
        <div className="score-box">
          Lesson {Math.min(step + 1, STEPS.length)} / {STEPS.length}
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${(step / STEPS.length) * 100}%` }}
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
                  : () => setWrong(true)
              }
              onMinuteClick={
                current.target === 'minute'
                  ? () => succeed()
                  : () => setWrong(true)
              }
              reveal={solved ? current.target : null}
            />
          </div>
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
              />
            </div>
          )}
          <div className="choices single-col">
            {current.options.map((option, index) => (
              <button
                key={option}
                className={
                  'choice-btn' +
                  (solved && index === current.answer ? ' correct' : '') +
                  (wrong && index !== current.answer ? ' wrong' : '')
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

      <p id="feedback" className={wrong ? 'bad' : solved ? 'good' : ''}>
        {solved
          ? `✅ Correct! ${current.explain}`
          : wrong
            ? 'Oops, try again! 💪'
            : ''}
      </p>

      {solved &&
        (isLast ? (
          <button className="next-btn" onClick={onStart}>
            You learned it all! 🎉 Start Practice ➡
          </button>
        ) : (
          <button className="next-btn" onClick={next}>
            Next lesson ➡
          </button>
        ))}
    </section>
  )
}

export default Tutorial
