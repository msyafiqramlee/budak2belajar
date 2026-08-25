import { useState } from 'react'
import Clock from './Clock.jsx'

const CHEER = ['Excellent work.', 'Correct — well done.', 'You got it.', 'Strong answer.']
const SESSION_LENGTH = 10

const PRACTICE_LEVELS = [
  {
    id: 'foundation',
    name: 'Foundation',
    bm: 'Asas',
    description: "Whole hours and half hours",
    detail: 'A clear starting point for new learners.',
  },
  {
    id: 'five-minute',
    name: 'Five-minute times',
    bm: '5 minit',
    description: 'Count around the clock by fives',
    detail: 'Build fluency with numbered minute landmarks.',
  },
  {
    id: 'exact',
    name: 'Exact minutes',
    bm: 'Minit tepat',
    description: 'Read every individual minute tick',
    detail: 'Challenge yourself with times such as 3:19 and 8:33.',
  },
]

function wrapHour(hour) {
  return ((hour - 1 + 12) % 12) + 1
}

// Keep this first practice set readable from the five-minute marks on the face.
function randomTime(level) {
  const hour = 1 + Math.floor(Math.random() * 12)
  let minute

  if (level === 'foundation') {
    minute = Math.random() < 0.5 ? 0 : 30
  } else if (level === 'exact') {
    minute = Math.floor(Math.random() * 60)
  } else {
    minute = Math.floor(Math.random() * 12) * 5
  }

  return { hour, minute }
}

function formatTime({ hour, minute }) {
  const mm = String(minute).padStart(2, '0')
  return `${hour}:${mm}`
}

function buildChoices(answer) {
  const previousFive = Math.floor(answer.minute / 5) * 5
  const handNumber = answer.minute === 0 ? 12 : Math.ceil(answer.minute / 5)
  const candidates = [
    answer,
    { hour: wrapHour(answer.hour + 1), minute: answer.minute },
    { hour: answer.hour, minute: handNumber },
    { hour: answer.hour, minute: previousFive },
    { hour: answer.hour, minute: (answer.minute + 1) % 60 },
    { hour: answer.hour, minute: (answer.minute + 5) % 60 },
  ]
  const choices = [...new Set(candidates.map(formatTime))].slice(0, 4)

  for (let index = choices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const temporary = choices[index]
    choices[index] = choices[swapIndex]
    choices[swapIndex] = temporary
  }

  return choices
}

function hintFor(question) {
  if (question.minute === 0) {
    return 'Hint: the long minute hand on 12 means :00. Try again!'
  }
  if (question.minute === 30) {
    return 'Hint: the long minute hand on 6 means :30. Try again!'
  }
  if (question.minute % 5 !== 0) {
    const previousFive = Math.floor(question.minute / 5) * 5
    const extraTicks = question.minute - previousFive
    return `Hint: start at :${String(previousFive).padStart(2, '0')}, then count ${extraTicks} small tick${extraTicks === 1 ? '' : 's'}. Try again!`
  }
  return `Hint: count by 5s to the long hand (${question.minute / 5} × 5). Try again!`
}

function Quiz({ onBack }) {
  const [level, setLevel] = useState(null)
  const [question, setQuestion] = useState(null)
  const [choices, setChoices] = useState([])
  const [wrongChoices, setWrongChoices] = useState([])
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState([])
  const [showSummary, setShowSummary] = useState(false)

  function startLevel(nextLevel) {
    const q = randomTime(nextLevel)
    setLevel(nextLevel)
    setQuestion(q)
    setChoices(buildChoices(q))
    setWrongChoices([])
    setSolved(false)
    setRevealed(false)
    setFeedback('')
    setScore(0)
    setStreak(0)
    setHistory([])
    setShowSummary(false)
  }

  function nextQuestion() {
    if (history.length >= SESSION_LENGTH) {
      setShowSummary(true)
      return
    }
    const q = randomTime(level)
    setQuestion(q)
    setChoices(buildChoices(q))
    setWrongChoices([])
    setSolved(false)
    setRevealed(false)
    setFeedback('')
  }

  function chooseAnotherLevel() {
    setLevel(null)
    setQuestion(null)
    setChoices([])
    setWrongChoices([])
    setSolved(false)
    setRevealed(false)
    setFeedback('')
    setScore(0)
    setStreak(0)
    setHistory([])
    setShowSummary(false)
  }

  if (!level) {
    return (
      <section className="card practice-select">
        <div className="hud">
          <button className="back-btn" onClick={onBack}>
            ← Menu
          </button>
        </div>
        <span className="eyebrow dark">Choose your challenge</span>
        <h2 className="practice-select-title">How would you like to practise?</h2>
        <p className="practice-select-intro">
          Start where the clock feels comfortable. You can change levels at any time.
        </p>
        <div className="practice-levels">
          {PRACTICE_LEVELS.map((practiceLevel, index) => (
            <button
              key={practiceLevel.id}
              className="practice-level-btn"
              onClick={() => startLevel(practiceLevel.id)}
            >
              <span className="practice-level-number">0{index + 1}</span>
              <span className="practice-level-copy">
                <strong>{practiceLevel.name} <small>· {practiceLevel.bm}</small></strong>
                <span>{practiceLevel.description}</span>
                <small>{practiceLevel.detail}</small>
              </span>
              <span className="practice-level-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
    )
  }

  function handlePick(choice) {
    if (solved || revealed || wrongChoices.includes(choice)) return
    const correct = choice === formatTime(question)
    if (correct) {
      const correctFirstTry = wrongChoices.length === 0
      setSolved(true)
      setFeedback(
        correctFirstTry
          ? CHEER[score % CHEER.length]
          : 'Correct after using the hint. Keep practising this pattern.',
      )
      setHistory((currentHistory) => [
        ...currentHistory,
        {
          question: formatTime(question),
          firstAnswer: wrongChoices[0] || choice,
          correctAnswer: formatTime(question),
          result: correctFirstTry ? 'correct' : 'hint',
        },
      ])
      if (correctFirstTry) {
        setScore((s) => s + 1)
        setStreak((s) => s + 1)
      }
    } else {
      const nextWrongChoices = [...wrongChoices, choice]
      setWrongChoices(nextWrongChoices)
      setStreak(0)
      if (nextWrongChoices.length === 1) {
        setFeedback(hintFor(question))
      } else {
        setRevealed(true)
        setFeedback(`The answer is ${formatTime(question)}. Let's try another!`)
        setHistory((currentHistory) => [
          ...currentHistory,
          {
            question: formatTime(question),
            firstAnswer: nextWrongChoices[0],
            correctAnswer: formatTime(question),
            result: 'revealed',
          },
        ])
      }
    }
  }

  const correctAnswer = formatTime(question)
  const finished = solved || revealed
  const levelInfo = PRACTICE_LEVELS.find((item) => item.id === level)
  const questionNumber = Math.min(
    history.length + (finished ? 0 : 1),
    SESSION_LENGTH,
  )

  if (showSummary) {
    const successRate = Math.round((score / SESSION_LENGTH) * 100)
    const hintCount = history.filter((item) => item.result === 'hint').length
    const revealedCount = history.filter(
      (item) => item.result === 'revealed',
    ).length

    return (
      <section className="card session-summary practice-summary">
        <span className="eyebrow dark">{levelInfo.name} complete</span>
        <h2>Your practice results</h2>
        <p className="summary-intro">
          You answered {SESSION_LENGTH} clock questions. Review your first
          answers to see which patterns need another look.
        </p>

        <div className="summary-score-grid">
          <div className="summary-score primary">
            <strong>{successRate}%</strong>
            <span>First-attempt success</span>
          </div>
          <div className="summary-score">
            <strong>{score}/{SESSION_LENGTH}</strong>
            <span>Correct first try</span>
          </div>
          <div className="summary-score">
            <strong>{hintCount + revealedCount}</strong>
            <span>Needed support</span>
          </div>
        </div>

        <div className="result-review answer-review">
          <h3>Answer review</h3>
          <ol>
            {history.map((item, index) => (
              <li key={`${item.question}-${index}`}>
                <span className="result-number">{index + 1}</span>
                <span className="answer-detail">
                  <strong>Clock: {item.question}</strong>
                  <small>
                    Your first answer: {item.firstAnswer} · Correct answer:{' '}
                    {item.correctAnswer}
                  </small>
                </span>
                <span className={`result-status ${item.result}`}>
                  {item.result === 'correct'
                    ? 'Correct'
                    : item.result === 'hint'
                      ? 'Used hint'
                      : 'Review'}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="summary-actions">
          <button className="primary-action" onClick={() => startLevel(level)}>
            Try another 10 →
          </button>
          <button className="secondary-action bordered" onClick={chooseAnotherLevel}>
            Change level
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
        <button className="back-btn" onClick={chooseAnotherLevel}>
          ← Levels
        </button>
        <div className="quiz-level-label">{levelInfo.name}</div>
        <div className="score-box">{questionNumber}/{SESSION_LENGTH}</div>
        <div className="score-box">Score {score}</div>
        <div className="streak-box">Streak {streak}</div>
      </div>

      <div className="clock-container">
        <Clock
          hour={question.hour}
          minute={question.minute}
          showMinuteLabels={level === 'foundation'}
          highlightMinute={level === 'exact' ? question.minute : null}
        />
      </div>

      <h2 className="question">What time is it?</h2>

      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice}
            className={
              'choice-btn' +
              (finished && choice === correctAnswer ? ' correct' : '') +
              (wrongChoices.includes(choice) ? ' wrong' : '')
            }
            disabled={finished || wrongChoices.includes(choice)}
            onClick={() => handlePick(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      <p
        id="feedback"
        role="status"
        aria-live="polite"
        className={feedback ? (solved ? 'good' : 'bad') : ''}
      >
        {feedback}
      </p>

      {finished && (
        <button className="next-btn" onClick={nextQuestion}>
          {history.length >= SESSION_LENGTH ? 'View results →' : 'Next →'}
        </button>
      )}
    </section>
  )
}

export default Quiz
