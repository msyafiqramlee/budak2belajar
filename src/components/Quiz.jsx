import { useState } from 'react'
import Clock from './Clock.jsx'

const CHEER = ['Awesome! 🎉', 'Great job! ⭐', 'You got it! 🥳', 'Super! 🚀']
const ENCOURAGE = ["Almost! It's", 'Try again — it was', 'So close! It was']

// Mix of all difficulties, weighted so kids get mostly friendly times
function randomTime() {
  const hour = 1 + Math.floor(Math.random() * 12)
  const roll = Math.random()
  let minute
  if (roll < 0.4) {
    // o'clock or half past
    minute = Math.random() < 0.5 ? 0 : 30
  } else if (roll < 0.75) {
    // 5-minute steps
    minute = Math.floor(Math.random() * 12) * 5
  } else {
    // any minute
    minute = Math.floor(Math.random() * 60)
  }
  return { hour, minute }
}

function formatTime({ hour, minute }) {
  const mm = String(minute).padStart(2, '0')
  return `${hour}:${mm}`
}

function buildChoices(answer) {
  const set = new Set([formatTime(answer)])
  while (set.size < 4) {
    const wrong = randomTime()
    const key = formatTime(wrong)
    if (wrong.hour !== answer.hour || wrong.minute !== answer.minute) {
      set.add(key)
    }
  }
  return [...set].sort(() => Math.random() - 0.5)
}

function Quiz({ onBack }) {
  const [question, setQuestion] = useState(() => randomTime())
  const [choices, setChoices] = useState(() => buildChoices(question))
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  function nextQuestion() {
    const q = randomTime()
    setQuestion(q)
    setChoices(buildChoices(q))
    setPicked(null)
  }

  function handlePick(choice) {
    if (picked) return
    setPicked(choice)
    const correct = choice === formatTime(question)
    if (correct) {
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
  }

  const correctAnswer = formatTime(question)
  const isCorrect = picked === correctAnswer
  const cheer = CHEER[Math.floor(Math.random() * CHEER.length)]
  const encourage = ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]

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
              (picked && choice === correctAnswer ? ' correct' : '') +
              (picked === choice && !isCorrect ? ' wrong' : '')
            }
            disabled={!!picked}
            onClick={() => handlePick(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      <p id="feedback" className={picked ? (isCorrect ? 'good' : 'bad') : ''}>
        {picked &&
          (isCorrect ? `${cheer}` : `${encourage} ${correctAnswer} 😊`)}
      </p>

      {picked && (
        <button className="next-btn" onClick={nextQuestion}>
          Next ➡
        </button>
      )}
    </section>
  )
}

export default Quiz
