import { useState } from 'react'
import LevelSelect from './components/LevelSelect.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
  const [level, setLevel] = useState(null)

  return (
    <div className="app">
      <header>
        <h1>🕰️ Budak2Belajar</h1>
        <p className="subtitle">Can you read the clock?</p>
      </header>

      <main>
        {level === null ? (
          <LevelSelect onSelect={setLevel} />
        ) : (
          <Quiz level={level} onBack={() => setLevel(null)} />
        )}
      </main>

      <footer>Made with ❤️ for little time-tellers</footer>
    </div>
  )
}

export default App
