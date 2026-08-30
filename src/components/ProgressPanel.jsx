import { TOPIC_SKILLS } from '../content/syllabus.js'

function StatusPill({ status }) {
  return <span className={`skill-status status-${status.toLowerCase()}`}>{status}</span>
}

export default function ProgressPanel({ topic, progress = {} }) {
  const skills = TOPIC_SKILLS[topic]
  const resolvedSkills = skills.map((skill) => ({
    ...skill,
    status: progress[skill.id] || skill.status,
  }))
  const counts = resolvedSkills.reduce((summary, skill) => {
    summary[skill.status] += 1
    return summary
  }, { New: 0, Practising: 0, Mastered: 0 })
  const nextSkill = resolvedSkills.find((skill) => skill.status !== 'Mastered') || resolvedSkills[0]
  const mastered = counts.Mastered
  const percent = Math.round((mastered / resolvedSkills.length) * 100)

  return (
    <section className="progress-panel" aria-labelledby="progress-title">
      <div className="progress-panel-heading">
        <div>
          <span className="eyebrow dark">Grown-up view</span>
          <h3 id="progress-title">Learning map</h3>
        </div>
        <span className="mastery-percent">{percent}% explored</span>
      </div>

      <div className="mastery-meter" aria-label={`${mastered} of ${skills.length} skills mastered`}>
        <span style={{ width: `${Math.max(percent, 4)}%` }} />
      </div>

      <div className="status-counts" aria-label="Skill status counts">
        <span><b>{counts.Mastered}</b> mastered</span>
        <span><b>{counts.Practising}</b> practising</span>
        <span><b>{counts.New}</b> to discover</span>
      </div>

      <div className="next-skill">
        <span className="next-skill-icon" aria-hidden="true">→</span>
        <div><small>Recommended next</small><strong>{nextSkill.title}</strong><p>{nextSkill.description}</p></div>
      </div>

      <ol className="skill-map-list">
        {resolvedSkills.map((skill, index) => (
          <li key={skill.id}>
            <span className="map-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="map-copy"><strong>{skill.title}</strong><small>{skill.year} · {skill.description}</small></span>
            <StatusPill status={skill.status} />
          </li>
        ))}
      </ol>
    </section>
  )
}
