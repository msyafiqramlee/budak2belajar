function Clock({ hour, minute }) {
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

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`Clock showing ${hour}:${minute}`}>
      <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#4a69bd" strokeWidth="8" />
      {numbers}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="52"
        stroke="#2d3436"
        strokeWidth="7"
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 100 100)`}
      />
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="32"
        stroke="#e17055"
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 100 100)`}
      />
      <circle cx="100" cy="100" r="6" fill="#2d3436" />
    </svg>
  )
}

export default Clock
