function Clock({ hour, minute, onHourClick, onMinuteClick, reveal }) {
  const minuteAngle = minute * 6
  const hourAngle = (hour % 12) * 30 + minute * 0.5

  const numbers = []
  for (let i = 1; i <= 12; i++) {
    const angle = i * 30 * (Math.PI / 180)
    const r = 74
    numbers.push(
      <text
        key={i}
        x={100 + r * Math.sin(angle)}
        y={100 - r * Math.cos(angle) + 6}
        textAnchor="middle"
        className="clock-number"
      >
        {i}
      </text>,
    )
  }

  const hourColor = reveal === 'hour' ? '#00b894' : '#2d3436'
  const minuteColor = reveal === 'minute' ? '#00b894' : '#e17055'

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`Clock showing ${hour}:${minute}`}>
      <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#4a69bd" strokeWidth="8" />
      {numbers}
      <g
        onClick={onHourClick}
        style={{ cursor: onHourClick ? 'pointer' : 'default' }}
      >
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="52"
          stroke="transparent"
          strokeWidth="26"
          transform={`rotate(${hourAngle} 100 100)`}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="52"
          stroke={hourColor}
          strokeWidth="7"
          strokeLinecap="round"
          className={reveal === 'hour' ? 'hand-reveal' : ''}
          transform={`rotate(${hourAngle} 100 100)`}
        />
      </g>
      <g
        onClick={onMinuteClick}
        style={{ cursor: onMinuteClick ? 'pointer' : 'default' }}
      >
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="32"
          stroke="transparent"
          strokeWidth="26"
          transform={`rotate(${minuteAngle} 100 100)`}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="32"
          stroke={minuteColor}
          strokeWidth="5"
          strokeLinecap="round"
          className={reveal === 'minute' ? 'hand-reveal' : ''}
          transform={`rotate(${minuteAngle} 100 100)`}
        />
      </g>
      <circle cx="100" cy="100" r="6" fill="#2d3436" />
    </svg>
  )
}

export default Clock
