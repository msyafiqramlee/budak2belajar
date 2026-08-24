import { useState } from 'react'
import LevelSelect from './components/LevelSelect.jsx'
import Tutorial from './components/Tutorial.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
  const [view, setView] = useState('menu')
  const [level, setLevel] = useState(null)

  return (
    <div className="app">
      <header>
        <h1>🕰️ Budak2Belajar</h1>
        <p className="subtitle">Can you read the clock?</p>
      </header>

      <main>
        {view === 'menu' && (
          <LevelSelect
            onSelect={(lvl) => {
              setLevel(lvl)
              setView('quiz')
            }}
            onLearn={() => setView('tutorial')}
          />
        )}
        {view === 'tutorial' && (
          <Tutorial
            onStart={() => {
              setLevel(null)
              setView('menu')
            }}
            onBack={() => setView('menu')}
          />
        )}
        {view === 'quiz' && (
          <Quiz level={level} onBack={() => setView('menu')} />
        )}
      </main>

      <footer>Made with ❤️ for little time-tellers</footer>
    </div>
  )
}

export default App
