import { useState } from 'react'
import Menu from './components/Menu.jsx'
import Tutorial from './components/Tutorial.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
  const [view, setView] = useState('menu')

  return (
    <div className="app">
      <header>
        <h1>🕰️ Budak2Belajar</h1>
        <p className="subtitle">Can you read the clock?</p>
      </header>

      <main>
        {view === 'menu' && (
          <Menu
            onLearn={() => setView('learn')}
            onPractice={() => setView('quiz')}
          />
        )}
        {view === 'learn' && (
          <Tutorial
            onStart={() => setView('quiz')}
            onBack={() => setView('menu')}
          />
        )}
        {view === 'quiz' && <Quiz onBack={() => setView('menu')} />}
      </main>

      <footer>Made with ❤️ for little time-tellers</footer>
    </div>
  )
}

export default App
