function Menu({ onLearn, onPractice }) {
  return (
    <section className="dashboard">
      <div className="topic-hero">
        <div className="topic-hero-copy">
          <span className="eyebrow">Clock quest · Let’s play</span>
          <h2>Let’s make friends with the clock!</h2>
          <p>
            Meet the short hand and the long hand, hop around the minute marks,
            and learn to read the time with confidence.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={onLearn}>
              Start the clock quest <span aria-hidden="true">→</span>
            </button>
            <button className="secondary-action" onClick={onPractice}>
              Play a quick round
            </button>
          </div>
          <div className="topic-facts" aria-label="Topic details">
            <span><strong>10</strong> fun steps</span>
            <span><strong>3</strong> mini missions</span>
            <span><strong>EN + BM</strong> key words</span>
          </div>
        </div>

        <div className="hero-clock" aria-hidden="true">
          <div className="hero-clock-face">
            <span className="hero-clock-number number-12">12</span>
            <span className="hero-clock-number number-3">3</span>
            <span className="hero-clock-number number-6">6</span>
            <span className="hero-clock-number number-9">9</span>
            <span className="hero-clock-hand hero-hour-hand" />
            <span className="hero-clock-hand hero-minute-hand" />
            <span className="hero-clock-pin" />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="path-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow dark">Your adventure map</span>
              <h3>Follow the little steps</h3>
            </div>
            <button className="text-action" onClick={onLearn}>Start the adventure →</button>
          </div>

          <ol className="skill-path">
            <li>
              <span className="skill-number">01</span>
              <span className="skill-copy">
                <strong>Hands and whole hours</strong>
                <small>Meet the clock hands and find the hour.</small>
              </span>
              <span className="skill-tag">Start here</span>
            </li>
            <li>
              <span className="skill-number">02</span>
              <span className="skill-copy">
                <strong>Minutes by five</strong>
                <small>Make five-minute jumps around the clock.</small>
              </span>
            </li>
            <li>
              <span className="skill-number">03</span>
              <span className="skill-copy">
                <strong>Exact minute ticks</strong>
                <small>Count every tiny tick, one minute at a time.</small>
              </span>
            </li>
            <li>
              <span className="skill-number">04</span>
              <span className="skill-copy">
                <strong>The moving hour hand</strong>
                <small>Spot the hour the short hand has passed.</small>
              </span>
            </li>
          </ol>
        </section>

        <aside className="practice-card">
          <span className="practice-icon" aria-hidden="true">★</span>
          <span className="eyebrow dark">Quick game</span>
          <h3>Ready for a little challenge?</h3>
          <p>Pick a level, read the clocks, and collect a streak of happy answers.</p>
          <button className="secondary-action full-width" onClick={onPractice}>
            Play the clock game
          </button>
        </aside>
      </div>
    </section>
  )
}

export default Menu
