import { useState } from 'react'
import LearningVisual from './LearningVisual.jsx'

function makeMixedModule(title, modules) {
  const steps = []
  for (let round = 0; round < 3 && steps.length < 10; round += 1) {
    modules.forEach((module) => {
      if (module.steps[round] && steps.length < 10) steps.push(module.steps[round])
    })
  }
  return { id: 'mixed', title: `Mixed ${title} practice`, bm: 'Latihan campuran', steps }
}

export function MixedModuleLesson({ title, modules, onBack }) {
  const [module] = useState(() => makeMixedModule(title, modules))
  return <ModuleLesson module={module} onBack={onBack} />
}

export default function ModuleLesson({ module, onBack }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [attempted, setAttempted] = useState(false)
  const [results, setResults] = useState([])
  const [finished, setFinished] = useState(false)
  const step = module.steps[stepIndex]

  function choose(optionIndex) {
    if (selected === step.answer) return
    const firstTry = !attempted
    setSelected(optionIndex)
    setAttempted(true)
    if (optionIndex === step.answer) {
      setResults((current) => [...current, { prompt: step.prompt, answer: step.options[step.answer], firstTry }])
    }
  }

  function next() {
    if (stepIndex === module.steps.length - 1) {
      setFinished(true)
      return
    }
    setStepIndex((value) => value + 1)
    setSelected(null)
    setAttempted(false)
  }

  function restart() {
    setStepIndex(0); setSelected(null); setAttempted(false); setResults([]); setFinished(false)
  }

  if (finished) {
    const firstTryCount = results.filter((result) => result.firstTry).length
    const rate = Math.round((firstTryCount / module.steps.length) * 100)
    return (
      <section className="card session-summary">
        <span className="eyebrow dark">Session complete</span><h2>{module.title}</h2>
        <p className="summary-intro">A short session is complete. Use the answer review to choose the next small gap to revisit.</p>
        <div className="summary-score-grid">
          <div className="summary-score primary"><strong>{rate}%</strong><span>First-attempt success</span></div>
          <div className="summary-score"><strong>{firstTryCount}/{module.steps.length}</strong><span>Correct first try</span></div>
          <div className="summary-score"><strong>{module.steps.length}</strong><span>Questions completed</span></div>
        </div>
        <div className="result-review"><h3>Answer review</h3><ol>{results.map((result, index) => <li key={index}><span className="result-number">{index + 1}</span><span className="answer-detail"><strong>{result.prompt}</strong><small>Answer: {result.answer}</small></span><span className={`result-status ${result.firstTry ? 'success' : 'supported'}`}>{result.firstTry ? 'First try' : 'With support'}</span></li>)}</ol></div>
        <div className="summary-actions"><button className="primary-action" onClick={restart}>Try this session again</button><button className="secondary-action bordered" onClick={onBack}>Back to categories</button></div>
      </section>
    )
  }

  const correct = selected === step.answer
  return (
    <section className="card module-lesson">
      <div className="hud"><button className="back-btn" onClick={onBack}>← Categories</button><span className="lesson-position"><span>{module.bm}</span><strong>{stepIndex + 1} of {module.steps.length}</strong></span></div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${((stepIndex + 1) / module.steps.length) * 100}%` }} /></div>
      <span className="eyebrow dark">{module.title}</span><h2 className="question">{step.prompt}</h2>
      {step.expression && <div className="math-expression">{step.expression}</div>}
      <LearningVisual visual={step.visual} />
      <div className="choices">{step.options.map((option, index) => <button key={option} className={`choice-btn${selected === index ? (index === step.answer ? ' correct' : ' wrong') : ''}`} disabled={correct} onClick={() => choose(index)}>{option}</button>)}</div>
      <div id="feedback" className={selected === null ? '' : correct ? 'good' : 'bad'}>{selected === null ? 'Choose the best answer.' : correct ? step.explain : `Not yet. ${step.hint}`}</div>
      {correct && <button className="next-btn" onClick={next}>{stepIndex === module.steps.length - 1 ? 'See my result' : 'Next question →'}</button>}
    </section>
  )
}
