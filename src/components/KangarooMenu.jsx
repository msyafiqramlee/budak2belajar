export default function KangarooMenu({ level, onSelect, onMock }) {
  const mock = {
    id: `${level.id}-mock`,
    title: `${level.years} mock paper`,
    bm: 'Kertas ujian',
    description: `Ten timed questions mixing every ${level.category} set — the closest taste of the real competition paper.`,
  }

  return (
    <section className="dashboard topic-library kangaroo">
      <div className="library-hero">
        <div>
          <span className="eyebrow">Plan B · Kangaroo Math preparation</span>
          <h2>{level.navLabel}</h2>
          <p>{level.intro}</p>
          <div className="topic-facts">
            <span><strong>{level.sets.length}</strong> practice sets</span>
            <span><strong>10</strong> questions per set</span>
            <span><strong>{level.minutes}</strong> minutes per mock paper</span>
          </div>
        </div>
        <div className="library-symbol" aria-hidden="true">{level.category}</div>
      </div>

      <div className="prerequisite-banner">
        <span className="prerequisite-banner-icon" aria-hidden="true">🏁</span>
        <div><strong>How is Plan B different from Plan A?</strong><p>Plan A teaches the school syllabus step by step with hints and retries. Plan B trains competition skills: tricky puzzles, multi-step thinking, and timed papers — the way Kangaroo Math asks them.</p></div>
      </div>

      <div className="module-heading">
        <div><span className="eyebrow dark">Pick a practice set</span><h3>Ready for a challenge?</h3></div>
        <p>Read every question twice. In Kangaroo, careful thinking beats fast guessing.</p>
      </div>
      <div className="module-grid">
        {level.sets.map((set, index) => (
          <button className={`module-card ${['blue', 'teal', 'violet', 'amber'][index % 4]}`} key={set.id} onClick={() => onSelect(set)}>
            <span className="module-order">{String(index + 1).padStart(2, '0')}</span>
            <span className="module-symbol" aria-hidden="true">★</span>
            <span className="module-copy"><strong>{set.title}</strong><small>{level.category} · {level.years}</small><p>{set.description}</p></span>
            <span className="module-start">Play this 10-question set →</span>
          </button>
        ))}
      </div>

      <div className="mixed-practice-card">
        <div><span className="eyebrow dark">Mock paper</span><h3>The real feel</h3><p>{mock.description} The clock runs — just like competition day.</p></div>
        <button className="primary-action" onClick={() => onMock(mock)}>Start the mock paper <span>→</span></button>
      </div>
    </section>
  )
}
