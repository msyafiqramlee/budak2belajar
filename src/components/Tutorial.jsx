import Clock from './Clock.jsx'

function Tutorial({ onStart, onBack }) {
  return (
    <section className="card">
      <div className="hud">
        <button className="back-btn" onClick={onBack}>
          ⬅ Back
        </button>
      </div>

      <h2 className="question">📖 How to read a clock</h2>
      <p className="tutorial-intro">
        A clock has two hands (<em>jarum</em>). One is short, one is long!
      </p>

      <div className="lesson">
        <h3>1️⃣ The SHORT hand = Hour hand</h3>
        <p>
          <strong>Jarum pendek</strong> menunjukkan <strong>JAM</strong>.
          It only points to the big numbers: 1, 2, 3... 12.
        </p>
        <div className="lesson-clock">
          <Clock hour={3} minute={0} />
          <p className="lesson-caption">
            The short hand points to <strong>3</strong> → it is{' '}
            <strong>3 o'clock</strong> (pukul 3)!
          </p>
        </div>
      </div>

      <div className="lesson">
        <h3>2️⃣ The LONG hand = Minute hand</h3>
        <p>
          <strong>Jarum panjang</strong> menunjukkan <strong>MINIT</strong>.
          Count in fives: each number it passes means 5 more minutes.
        </p>
        <div className="minute-table">
          {[
            ['1', '5'],
            ['2', '10'],
            ['3', '15'],
            ['6', '30'],
            ['9', '45'],
            ['12', '0'],
          ].map(([num, min]) => (
            <div key={num} className="minute-chip">
              <span className="minute-num">{num}</span>→{' '}
              <span className="minute-val">:{String(min).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
        <div className="lesson-clock">
          <Clock hour={10} minute={15} />
          <p className="lesson-caption">
            Short hand is past <strong>10</strong>, long hand points to{' '}
            <strong>3</strong> (= 15 minutes) → it is{' '}
            <strong>10:15</strong> (pukul 10:15)!
          </p>
        </div>
      </div>

      <div className="lesson">
        <h3>💡 Remember!</h3>
        <ul className="tips">
          <li>
            Short &amp; slow = <strong>HOURS</strong> (jam) 🐢
          </li>
          <li>
            Long &amp; fast = <strong>MINUTES</strong> (minit) 🐇
          </li>
          <li>Read the short hand FIRST, then the long hand.</li>
        </ul>
      </div>

      <button className="next-btn" onClick={onStart}>
        I'm ready! Start the quiz 🎯
      </button>
    </section>
  )
}

export default Tutorial
