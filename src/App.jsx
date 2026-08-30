import { useEffect, useState } from 'react'
import Menu from './components/Menu.jsx'
import Tutorial, { TranslationQuiz } from './components/Tutorial.jsx'
import Quiz from './components/Quiz.jsx'
import TopicMenu from './components/TopicMenu.jsx'
import ModuleLesson, { MixedModuleLesson } from './components/ModuleLesson.jsx'
import KangarooMenu from './components/KangarooMenu.jsx'
import ProgressPanel from './components/ProgressPanel.jsx'
import { FRACTION_MODULES, OPERATION_MODULES } from './content/learningContent.js'
import { KANGAROO_LEVELS } from './content/kangarooContent.js'
import './App.css'

const TOPICS = {
  clock: { label: 'Reading clocks', icon: '◷' },
  operations: { label: 'Number operations', icon: '+−' },
  fractions: { label: 'Fractions', icon: '½' },
}

const PLANS = {
  basic: { label: 'Plan A · Basic', small: 'School syllabus, step by step' },
  kangaroo: { label: 'Plan B · Kangaroo prep', small: 'Competition puzzles, Year 1–6' },
}

const PLAN_START_TOPIC = { basic: 'clock', kangaroo: 'kangaroo-12' }

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
  const [plan, setPlan] = useState('basic')
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
  function navigate(nextView) { setView(plan === 'kangaroo' && nextView === 'quiz' ? 'menu' : nextView); setSidebarOpen(false) }
  function navigateTopic(nextTopic) { setTopic(nextTopic); setView('menu'); setSelectedModule(null); setSidebarOpen(false) }
  function navigatePlan(nextPlan) { setPlan(nextPlan); navigateTopic(PLAN_START_TOPIC[nextPlan]) }
  function openModule(module) {
    const minutes = plan === 'kangaroo' ? KANGAROO_LEVELS[topic]?.minutes : undefined
    setSelectedModule(minutes ? { ...module, minutes } : module)
    navigate('learn')
  }
  function markProgress(skillId, status) {
    const mappedSkillId = SKILL_ID_MAP[skillId] || skillId
    setProgress((current) => ({ ...current, [`${topic}-${mappedSkillId}`]: status }))
  }

  const KANGAROO_TOPICS = Object.fromEntries(
    Object.values(KANGAROO_LEVELS).map((level) => [level.id, { label: level.navLabel, icon: '🦘' }]),
  )
  const topicMeta = plan === 'kangaroo' ? KANGAROO_TOPICS : TOPICS
  const current = topicMeta[topic]
  const pageTitle = view === 'learn' ? selectedModule?.title || 'Guided lesson' : view === 'quiz' ? `${current.label} practice` : `${current.label} learning path`
  const navItems = plan === 'kangaroo'
    ? Object.values(KANGAROO_LEVELS).map((level) => ({ id: level.id, icon: '🦘', label: level.navLabel, small: `${level.category} · ${level.navSmall}` }))
    : Object.entries(TOPICS).map(([id, item]) => ({ id, icon: item.icon, label: item.label, small: id === 'clock' ? 'Time and minute intervals' : id === 'operations' ? 'Add, subtract, multiply, divide' : 'Parts, compare and calculate' }))

  return (
    <div className="app-shell">
      <button className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`} aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="brand"><span className="brand-mark" aria-hidden="true"><span className="brand-hand brand-hand-hour" /><span className="brand-hand brand-hand-minute" /></span><span><strong>Budak2Belajar</strong><small>Learn, play, grow!</small></span></div>
        <p className="nav-label">Choose a plan</p>
        <div className="plan-switch">
          {Object.entries(PLANS).map(([id, item]) => (
            <button key={id} className={`plan-card${plan === id ? ' active' : ''}`} aria-pressed={plan === id} onClick={() => navigatePlan(id)}>
              <strong>{item.label}</strong>
              <small>{item.small}</small>
            </button>
          ))}
        </div>
        <nav className="sidebar-nav" aria-label="Learning topics">
          <p className="nav-label nav-label-spaced">{plan === 'kangaroo' ? 'Pick your level' : 'Pick an adventure'}</p>
          {navItems.map((item) => <button key={item.id} className={`nav-item${topic === item.id ? ' active' : ''}`} aria-current={topic === item.id ? 'page' : undefined} onClick={() => navigateTopic(item.id)}><span className={`nav-icon${item.id === 'fractions' ? ' fraction-icon' : ''}`} aria-hidden="true">{item.icon}</span><span className="nav-copy"><strong>{item.label}</strong><small>{item.small}</small></span></button>)}
        </nav>
        <div className="sidebar-note"><span className="sidebar-note-icon" aria-hidden="true">★</span><p><strong>Every try counts!</strong> Little steps help your brain grow.</p></div>
      </aside>
      <div className={`app-content topic-${topic}`}>
        <header className="mobile-header"><button className="mobile-menu-btn" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><span /><span /><span /></button><div className="mobile-brand"><span className="brand-mark small" aria-hidden="true"><span className="brand-hand brand-hand-hour" /><span className="brand-hand brand-hand-minute" /></span><strong>Budak2Belajar</strong><small>Learn, play, grow!</small></div></header>
        <div className="page-header"><div><p className="breadcrumb">{plan === 'kangaroo' ? 'Kangaroo prep' : 'Learning'} / {current.label}</p><h1>{pageTitle}</h1></div><span className="topic-status"><span /> You’ve got this!</span></div>
        <main className="workspace">
          {topic === 'clock' && view === 'menu' && <Menu onLearn={() => navigate('learn')} onPractice={() => navigate('quiz')} onTranslation={() => navigate('translation')} />}
          {topic === 'clock' && view === 'learn' && <Tutorial onStart={() => navigate('quiz')} onBack={() => navigate('menu')} onTranslation={() => navigate('translation')} onProgress={markProgress} />}
          {topic === 'clock' && view === 'translation' && <TranslationQuiz onBack={() => navigate('menu')} />}
          {topic === 'clock' && view === 'quiz' && <Quiz onBack={() => navigate('menu')} />}
          {topic === 'operations' && view === 'menu' && <TopicMenu type="operations" title="Number operations" subtitle="Master the four calculations that support fractions, measurement, money, and later mathematics." modules={OPERATION_MODULES} onSelect={openModule} onPractice={() => navigate('quiz')} />}
          {topic === 'fractions' && view === 'menu' && <TopicMenu type="fractions" title="Fractions" subtitle="Move from equal parts and fraction language to comparing and calculating with fractions." modules={FRACTION_MODULES} onSelect={openModule} onPractice={() => navigate('quiz')} onPrerequisite={() => navigateTopic('operations')} />}
          {plan === 'kangaroo' && view === 'menu' && <KangarooMenu level={KANGAROO_LEVELS[topic]} onSelect={openModule} onMock={openModule} />}
          {plan === 'basic' && topic !== 'clock' && view === 'learn' && selectedModule && <ModuleLesson key={selectedModule.id} module={selectedModule} onBack={() => navigate('menu')} onProgress={markProgress} />}
          {plan === 'kangaroo' && view === 'learn' && selectedModule && <ModuleLesson key={selectedModule.id} module={selectedModule} durationMinutes={selectedModule.minutes} onBack={() => navigate('menu')} onProgress={markProgress} />}
          {topic === 'operations' && view === 'quiz' && <MixedModuleLesson title="number operations" modules={OPERATION_MODULES} onBack={() => navigate('menu')} />}
          {topic === 'fractions' && view === 'quiz' && <MixedModuleLesson title="fractions" modules={FRACTION_MODULES} onBack={() => navigate('menu')} />}
          {view === 'menu' && <ProgressPanel topic={topic} progress={Object.fromEntries(Object.entries(progress).filter(([key]) => key.startsWith(`${topic}-`)).map(([key, status]) => [key.replace(`${topic}-`, ''), status]))} />}
        </main>
      </div>
    </div>
  )
}

export default App
