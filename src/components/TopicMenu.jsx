export default function TopicMenu({ type, title, subtitle, modules, onSelect, onPractice, onPrerequisite }) {
  const isFraction = type === 'fractions'

  return (
    <section className={`dashboard topic-library ${type}`}>
      <div className="library-hero">
        <div>
          <span className="eyebrow">Standard 1–6 learning path</span>
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
          <span aria-hidden="true">↗</span>
          <div><strong>Build the calculation foundation first</strong><p>Fractions use division to make equal parts, multiplication for equivalent fractions, and addition or subtraction to combine parts.</p></div>
          <button className="secondary-action bordered" onClick={onPrerequisite}>Review number operations</button>
        </div>
      )}

      <div className="module-heading">
        <div><span className="eyebrow dark">Choose a small gap</span><h3>Guided categories</h3></div>
        <p>Start with the first category and move forward when the child is comfortable.</p>
      </div>
      <div className="module-grid">
        {modules.map((module, index) => (
          <button className={`module-card ${module.colour}`} key={module.id} onClick={() => onSelect(module)}>
            <span className="module-order">{String(index + 1).padStart(2, '0')}</span>
            <span className="module-symbol" aria-hidden="true">{module.symbol}</span>
            <span className="module-copy"><strong>{module.title}</strong><small>{module.bm}</small><p>{module.description}</p></span>
            {module.prerequisite && <span className="module-prerequisite">Uses: {module.prerequisite}</span>}
            <span className="module-start">Start 5-step lesson →</span>
          </button>
        ))}
      </div>

      <div className="mixed-practice-card">
        <div><span className="eyebrow dark">Check understanding</span><h3>Mixed {title.toLowerCase()} practice</h3><p>Ten questions across all four categories, followed by a result and first-attempt success rate.</p></div>
        <button className="primary-action" onClick={onPractice}>Start 10 questions <span>→</span></button>
      </div>
    </section>
  )
}
