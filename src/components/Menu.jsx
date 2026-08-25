function Menu({ onLearn, onPractice }) {
  return (
    <section className="dashboard">
      <div className="topic-hero">
        <div className="topic-hero-copy">
          <span className="eyebrow">Analog time · Foundation</span>
          <h2>Master the clock, one skill at a time.</h2>
          <p>
            Learn what each hand means, count minute landmarks, read exact
            ticks, and understand how the hour hand moves.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={onLearn}>
              Start guided lesson <span aria-hidden="true">→</span>
            </button>
            <button className="secondary-action" onClick={onPractice}>
              Practise now
            </button>
          </div>
          <div className="topic-facts" aria-label="Topic details">
            <span><strong>10</strong> guided steps</span>
            <span><strong>3 parts</strong> clear progression</span>
            <span><strong>EN + BM</strong> key terms</span>
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
              <span className="eyebrow dark">Your learning path</span>
              <h3>Build the skill in order</h3>
            </div>
            <button className="text-action" onClick={onLearn}>Begin lesson →</button>
          </div>

          <ol className="skill-path">
            <li>
              <span className="skill-number">01</span>
              <span className="skill-copy">
                <strong>Hands and whole hours</strong>
                <small>Know which hand shows hours, minutes, and :00.</small>
              </span>
              <span className="skill-tag">Start here</span>
            </li>
            <li>
              <span className="skill-number">02</span>
              <span className="skill-copy">
                <strong>Minutes by five</strong>
                <small>Connect numbered stops to 05, 10, 15 and beyond.</small>
              </span>
            </li>
            <li>
              <span className="skill-number">03</span>
              <span className="skill-copy">
                <strong>Exact minute ticks</strong>
                <small>Count forward from a five-minute landmark.</small>
              </span>
            </li>
            <li>
              <span className="skill-number">04</span>
              <span className="skill-copy">
                <strong>The moving hour hand</strong>
                <small>Read the hour already passed as the hand moves forward.</small>
              </span>
            </li>
          </ol>
        </section>

        <aside className="practice-card">
          <span className="practice-icon" aria-hidden="true">◎</span>
          <span className="eyebrow dark">Quick practice</span>
          <h3>Ready to test yourself?</h3>
          <p>Choose foundation, five-minute, or exact-minute questions at any time.</p>
          <button className="secondary-action full-width" onClick={onPractice}>
            Open practice
          </button>
        </aside>
      </div>
    </section>
  )
}

export default Menu
