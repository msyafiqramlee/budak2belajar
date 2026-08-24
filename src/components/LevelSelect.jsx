const LEVELS = [
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
]

function LevelSelect({ onSelect }) {
  return (
    <section className="card">
      <h2>Choose your level</h2>
      <div className="levels">
        {LEVELS.map((lvl) => (
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
