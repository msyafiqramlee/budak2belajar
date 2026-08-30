import { useEffect, useState } from 'react'
import Menu from './components/Menu.jsx'
import Tutorial, { TranslationQuiz } from './components/Tutorial.jsx'
import Quiz from './components/Quiz.jsx'
import TopicMenu from './components/TopicMenu.jsx'
import ModuleLesson, { MixedModuleLesson } from './components/ModuleLesson.jsx'
import ProgressPanel from './components/ProgressPanel.jsx'
import { FRACTION_MODULES, OPERATION_MODULES } from './content/learningContent.js'
import './App.css'

const TOPICS = {
  clock: { label: 'Reading clocks', icon: '◷' },
  operations: { label: 'Number operations', icon: '+−' },
  fractions: { label: 'Fractions', icon: '½' },
}

const SKILL_ID_MAP = {
  addition: 'operations-add',
  subtraction: 'operations-subtract',
  multiplication: 'operations-multiply',
  division: 'operations-divide',
  'fraction-foundations': 'fractions-parts',
  'equivalent-compare': 'fractions-equivalent',
  'fraction-add-subtract': 'fractions-add',
  'fraction-multiply-divide': 'fractions-advanced',
}

function App() {
  const [topic, setTopic] = useState('clock')
  const [view, setView] = useState('menu')
  const [selectedModule, setSelectedModule] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('budak2belajar-progress') || '{}') } catch { return {} }
  })
  useEffect(() => {
    localStorage.setItem('budak2belajar-progress', JSON.stringify(progress))
  }, [progress])
  function navigate(nextView) { setView(nextView); setSidebarOpen(false) }
  function navigateTopic(nextTopic) { setTopic(nextTopic); setView('menu'); setSelectedModule(null); setSidebarOpen(false) }
  function openModule(module) { setSelectedModule(module); navigate('learn') }
  function markProgress(skillId, status) {
    const mappedSkillId = SKILL_ID_MAP[skillId] || skillId
    setProgress((current) => ({ ...current, [`${topic}-${mappedSkillId}`]: status }))
  }

  const current = TOPICS[topic]
  const pageTitle = view === 'learn' ? selectedModule?.title || 'Guided lesson' : view === 'quiz' ? `${current.label} practice` : `${current.label} learning path`

  return (
    <div className="app-shell">
      <button className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`} aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="brand"><span className="brand-mark" aria-hidden="true"><span className="brand-hand brand-hand-hour" /><span className="brand-hand brand-hand-minute" /></span><span><strong>Budak2Belajar</strong><small>Learn, play, grow!</small></span></div>
        <nav className="sidebar-nav" aria-label="Learning topics">
          <p className="nav-label">Pick an adventure</p>
          {Object.entries(TOPICS).map(([id, item]) => <button key={id} className={`nav-item${topic === id ? ' active' : ''}`} aria-current={topic === id ? 'page' : undefined} onClick={() => navigateTopic(id)}><span className={`nav-icon${id === 'fractions' ? ' fraction-icon' : ''}`} aria-hidden="true">{item.icon}</span><span className="nav-copy"><strong>{item.label}</strong><small>{id === 'clock' ? 'Time and minute intervals' : id === 'operations' ? 'Add, subtract, multiply, divide' : 'Parts, compare and calculate'}</small></span></button>)}
        </nav>
        <div className="sidebar-note"><span className="sidebar-note-icon" aria-hidden="true">★</span><p><strong>Every try counts!</strong> Little steps help your brain grow.</p></div>
      </aside>
      <div className={`app-content topic-${topic}`}>
        <header className="mobile-header"><button className="mobile-menu-btn" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><span /><span /><span /></button><div className="mobile-brand"><span className="brand-mark small" aria-hidden="true"><span className="brand-hand brand-hand-hour" /><span className="brand-hand brand-hand-minute" /></span><strong>Budak2Belajar</strong><small>Learn, play, grow!</small></div></header>
        <div className="page-header"><div><p className="breadcrumb">Learning / {current.label}</p><h1>{pageTitle}</h1></div><span className="topic-status"><span /> You’ve got this!</span></div>
        <main className="workspace">
          {topic === 'clock' && view === 'menu' && <Menu onLearn={() => navigate('learn')} onPractice={() => navigate('quiz')} onTranslation={() => navigate('translation')} />}
          {topic === 'clock' && view === 'learn' && <Tutorial onStart={() => navigate('quiz')} onBack={() => navigate('menu')} onTranslation={() => navigate('translation')} onProgress={markProgress} />}
          {topic === 'clock' && view === 'translation' && <TranslationQuiz onBack={() => navigate('menu')} />}
          {topic === 'clock' && view === 'quiz' && <Quiz onBack={() => navigate('menu')} />}
          {topic === 'operations' && view === 'menu' && <TopicMenu type="operations" title="Number operations" subtitle="Master the four calculations that support fractions, measurement, money, and later mathematics." modules={OPERATION_MODULES} onSelect={openModule} onPractice={() => navigate('quiz')} />}
          {topic === 'fractions' && view === 'menu' && <TopicMenu type="fractions" title="Fractions" subtitle="Move from equal parts and fraction language to comparing and calculating with fractions." modules={FRACTION_MODULES} onSelect={openModule} onPractice={() => navigate('quiz')} onPrerequisite={() => navigateTopic('operations')} />}
          {topic !== 'clock' && view === 'learn' && selectedModule && <ModuleLesson key={selectedModule.id} module={selectedModule} onBack={() => navigate('menu')} onProgress={markProgress} />}
          {topic === 'operations' && view === 'quiz' && <MixedModuleLesson title="number operations" modules={OPERATION_MODULES} onBack={() => navigate('menu')} />}
          {topic === 'fractions' && view === 'quiz' && <MixedModuleLesson title="fractions" modules={FRACTION_MODULES} onBack={() => navigate('menu')} />}
          {view === 'menu' && <ProgressPanel topic={topic} progress={Object.fromEntries(Object.entries(progress).filter(([key]) => key.startsWith(`${topic}-`)).map(([key, status]) => [key.replace(`${topic}-`, ''), status]))} />}
        </main>
      </div>
    </div>
  )
}

export default App
