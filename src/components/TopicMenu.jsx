export default function TopicMenu({ type, title, subtitle, modules, onSelect, onPractice, onPrerequisite }) {
  const isFraction = type === 'fractions'

  return (
    <section className={`dashboard topic-library ${type}`}>
      <div className="library-hero">
        <div>
          <span className="eyebrow">Learning adventure · Choose your path</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="topic-facts">
            <span><strong>{modules.length}</strong> focused categories</span>
            <span><strong>5</strong> guided questions each</span>
            <span><strong>10</strong> questions per mixed practice</span>
          </div>
        </div>
        <div className="library-symbol" aria-hidden="true">{isFraction ? '¾' : '+ − × ÷'}</div>
      </div>

      {isFraction && (
        <div className="prerequisite-banner">
          <span className="prerequisite-banner-icon" aria-hidden="true">🧩</span>
          <div><strong>Want an extra superpower?</strong><p>Number skills help with fractions. You can visit them first, then come back here.</p></div>
          <button className="secondary-action bordered" onClick={onPrerequisite}>Visit number games</button>
        </div>
      )}

      <div className="module-heading">
        <div><span className="eyebrow dark">Pick a mini mission</span><h3>Where should we explore?</h3></div>
        <p>Start with any mini mission and take it one cheerful question at a time.</p>
      </div>
      <div className="module-grid">
        {modules.map((module, index) => (
          <button className={`module-card ${module.colour}`} key={module.id} onClick={() => onSelect(module)}>
            <span className="module-order">{String(index + 1).padStart(2, '0')}</span>
            <span className="module-symbol" aria-hidden="true">{module.symbol}</span>
            <span className="module-copy"><strong>{module.title}</strong><small>{module.bm}</small><p>{module.description}</p></span>
            {module.prerequisite && <span className="module-prerequisite">Uses: {module.prerequisite}</span>}
            <span className="module-start">Play this 5-question mission →</span>
          </button>
        ))}
      </div>

      <div className="mixed-practice-card">
        <div><span className="eyebrow dark">Super challenge</span><h3>Mix it all together</h3><p>Ten questions across all four categories, followed by a result and first-attempt success rate.</p></div>
        <button className="primary-action" onClick={onPractice}>Play 10 questions <span>→</span></button>
      </div>
    </section>
  )
}
