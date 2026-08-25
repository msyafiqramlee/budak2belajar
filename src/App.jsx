import { useState } from 'react'
import Menu from './components/Menu.jsx'
import Tutorial from './components/Tutorial.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

function App() {
  const [view, setView] = useState('menu')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function navigate(nextView) {
    setView(nextView)
    setSidebarOpen(false)
  }

  const pageTitle =
    view === 'learn'
      ? 'Guided lesson'
      : view === 'quiz'
        ? 'Clock practice'
        : 'Clock learning path'

  return (
    <div className="app-shell">
      <button
        className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-hand brand-hand-hour" />
            <span className="brand-hand brand-hand-minute" />
          </span>
          <span>
            <strong>Budak2Belajar</strong>
            <small>Build strong foundations</small>
          </span>
        </div>

        <nav className="sidebar-nav" aria-label="Learning topics">
          <p className="nav-label">Learning</p>
          <button
            className="nav-item active"
            aria-current="page"
            onClick={() => navigate('menu')}
          >
            <span className="nav-icon" aria-hidden="true">◷</span>
            <span className="nav-copy">
              <strong>Reading clocks</strong>
              <small>Current topic</small>
            </span>
          </button>

          <p className="nav-label nav-label-spaced">Up next</p>
          <button className="nav-item" disabled>
            <span className="nav-icon fraction-icon" aria-hidden="true">½</span>
            <span className="nav-copy">
              <strong>Fractions</strong>
              <small>Coming soon</small>
            </span>
            <span className="soon-badge">Soon</span>
          </button>
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-icon" aria-hidden="true">✓</span>
          <p><strong>Small gaps matter.</strong> Learn one clear skill at a time.</p>
        </div>
      </aside>

      <div className="app-content">
        <header className="mobile-header">
          <button
            className="mobile-menu-btn"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="mobile-brand">
            <span className="brand-mark small" aria-hidden="true">
              <span className="brand-hand brand-hand-hour" />
              <span className="brand-hand brand-hand-minute" />
            </span>
            <strong>Budak2Belajar</strong>
          </div>
        </header>

        <div className="page-header">
          <div>
            <p className="breadcrumb">Learning / Reading clocks</p>
            <h1>{pageTitle}</h1>
          </div>
          <span className="topic-status"><span /> Active topic</span>
        </div>

        <main className="workspace">
          {view === 'menu' && (
            <Menu
              onLearn={() => navigate('learn')}
              onPractice={() => navigate('quiz')}
            />
          )}
          {view === 'learn' && (
            <Tutorial
              onStart={() => navigate('quiz')}
              onBack={() => navigate('menu')}
            />
          )}
          {view === 'quiz' && <Quiz onBack={() => navigate('menu')} />}
        </main>
      </div>
    </div>
  )
}

export default App
