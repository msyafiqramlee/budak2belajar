function LevelSelect({ onSelect, onLearn }) {
  return (
    <section className="card">
      <h2>Choose your level</h2>
      <div className="levels">
        <button className="level-btn" onClick={onLearn}>
          <span className="level-icon">📖</span>
          <span className="level-name">Learn</span>
          <span className="level-desc">How to read a clock</span>
        </button>
        {[
          {
            id: 'easy',
            icon: '😊',
            name: 'Easy',
            desc: "O'clock & half past",
            minutes: [0, 30],
          },
          {
            id: 'medium',
            icon: '😃',
            name: 'Medium',
            desc: 'Quarter & 5 minutes',
            step: 5,
          },
          {
            id: 'hard',
            icon: '🤓',
            name: 'Hard',
            desc: 'Every minute!',
            step: 1,
          },
        ].map((lvl) => (
          <button
            key={lvl.id}
            className="level-btn"
            onClick={() => onSelect(lvl)}
          >
            <span className="level-icon">{lvl.icon}</span>
            <span className="level-name">{lvl.name}</span>
            <span className="level-desc">{lvl.desc}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default LevelSelect
