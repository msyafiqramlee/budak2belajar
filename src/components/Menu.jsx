function Menu({ onLearn, onPractice }) {
  return (
    <section className="card">
      <h2>What do you want to do?</h2>
      <div className="levels two-col">
        <button className="level-btn big" onClick={onLearn}>
          <span className="level-icon">📖</span>
          <span className="level-name">Learn</span>
          <span className="level-desc">
            Meet the hands — a fun mini lesson
          </span>
        </button>
        <button className="level-btn big" onClick={onPractice}>
          <span className="level-icon">🎯</span>
          <span className="level-name">Practice</span>
          <span className="level-desc">Guess the time — all mixed!</span>
        </button>
      </div>
    </section>
  )
}

export default Menu
