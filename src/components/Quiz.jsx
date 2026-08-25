import { useState } from 'react'
import Clock from './Clock.jsx'

const CHEER = ['Awesome! 🎉', 'Great job! ⭐', 'You got it! 🥳', 'Super! 🚀']

function wrapHour(hour) {
  return ((hour - 1 + 12) % 12) + 1
}

// Keep this first practice set readable from the five-minute marks on the face.
function randomTime() {
  const hour = 1 + Math.floor(Math.random() * 12)
  const roll = Math.random()
  const minute =
    roll < 0.5
      ? Math.random() < 0.5
        ? 0
        : 30
      : Math.floor(Math.random() * 12) * 5
  return { hour, minute }
}

function formatTime({ hour, minute }) {
  const mm = String(minute).padStart(2, '0')
  return `${hour}:${mm}`
}

function buildChoices(answer) {
  const handNumber = answer.minute === 0 ? 12 : answer.minute / 5
  const candidates = [
    answer,
    { hour: wrapHour(answer.hour + 1), minute: answer.minute },
    { hour: answer.hour, minute: handNumber },
    { hour: answer.hour, minute: (answer.minute + 15) % 60 },
    { hour: wrapHour(handNumber), minute: (answer.hour * 5) % 60 },
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
  return `Hint: count by 5s to the long hand (${question.minute / 5} × 5). Try again!`
}

function Quiz({ onBack }) {
  const [question, setQuestion] = useState(() => randomTime())
  const [choices, setChoices] = useState(() => buildChoices(question))
  const [wrongChoices, setWrongChoices] = useState([])
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  function nextQuestion() {
    const q = randomTime()
    setQuestion(q)
    setChoices(buildChoices(q))
    setWrongChoices([])
    setSolved(false)
    setRevealed(false)
    setFeedback('')
  }

  function handlePick(choice) {
    if (solved || revealed || wrongChoices.includes(choice)) return
    const correct = choice === formatTime(question)
    if (correct) {
      setSolved(true)
      setFeedback(CHEER[score % CHEER.length])
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
    } else {
      const nextWrongChoices = [...wrongChoices, choice]
      setWrongChoices(nextWrongChoices)
      setStreak(0)
      if (nextWrongChoices.length === 1) {
        setFeedback(hintFor(question))
      } else {
        setRevealed(true)
        setFeedback(`The answer is ${formatTime(question)}. Let's try another!`)
      }
    }
  }

  const correctAnswer = formatTime(question)
  const finished = solved || revealed

  return (
    <section className="card">
      <div className="hud">
        <button className="back-btn" onClick={onBack}>
          ⬅ Menu
        </button>
        <div className="score-box">{score} ⭐</div>
        <div className="streak-box">🔥 {streak}</div>
      </div>

      <div className="clock-container">
        <Clock hour={question.hour} minute={question.minute} />
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
          Next ➡
        </button>
      )}
    </section>
  )
}

export default Quiz
