function handleKeyActivate(event, handler) {
  if (handler && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    handler()
  }
}

function Clock({
  hour,
  minute,
  onHourClick,
  onMinuteClick,
  reveal,
  showMinuteLabels = false,
  highlightMinute = null,
}) {
  const minuteAngle = minute * 6
  const hourAngle = (hour % 12) * 30 + minute * 0.5

  const numbers = []
  const minuteTicks = []
  const minuteLabels = []
  const highlightBase =
    highlightMinute === null ? null : Math.floor(highlightMinute / 5) * 5

  for (let i = 0; i < 60; i++) {
    const isFiveMinuteMark = i % 5 === 0
    const isHighlighted =
      highlightMinute !== null &&
      i >= highlightBase &&
      i <= highlightMinute
    minuteTicks.push(
      <line
        key={`tick-${i}`}
        x1="100"
        y1={isFiveMinuteMark ? '14' : '10'}
        x2="100"
        y2="17"
        stroke={
          isHighlighted
            ? '#e76f51'
            : isFiveMinuteMark
              ? '#2563eb'
              : '#cbd5e1'
        }
        strokeWidth={isHighlighted ? '3' : isFiveMinuteMark ? '2' : '1'}
        transform={`rotate(${i * 6} 100 100)`}
      />,
    )
  }

  if (showMinuteLabels) {
    for (let i = 0; i < 12; i++) {
      const minuteValue = i * 5
      const angle = i * 30 * (Math.PI / 180)
      const r = 81
      minuteLabels.push(
        <text
          key={`minute-label-${minuteValue}`}
          x={100 + r * Math.sin(angle)}
          y={100 - r * Math.cos(angle) + 3}
          textAnchor="middle"
          className="clock-minute-label"
        >
          {String(minuteValue).padStart(2, '0')}
        </text>,
      )
    }
  }

  for (let i = 1; i <= 12; i++) {
    const angle = i * 30 * (Math.PI / 180)
    const r = showMinuteLabels ? 63 : 74
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

  const formattedMinute = String(minute).padStart(2, '0')

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Clock showing ${hour}:${formattedMinute}`}
    >
      <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#2563eb" strokeWidth="8" />
      {minuteTicks}
      {minuteLabels}
      {numbers}
      <g
        className="clock-hand-control"
        onClick={onHourClick}
        onKeyDown={(event) => handleKeyActivate(event, onHourClick)}
        role={onHourClick ? 'button' : undefined}
        tabIndex={onHourClick ? 0 : undefined}
        aria-label={onHourClick ? 'Short hour hand' : undefined}
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
          stroke="#17263c"
          strokeWidth="7"
          strokeLinecap="round"
          className={`clock-hand-visible${reveal === 'hour' ? ' hand-reveal' : ''}`}
          transform={`rotate(${hourAngle} 100 100)`}
        />
      </g>
      <g
        className="clock-hand-control"
        onClick={onMinuteClick}
        onKeyDown={(event) => handleKeyActivate(event, onMinuteClick)}
        role={onMinuteClick ? 'button' : undefined}
        tabIndex={onMinuteClick ? 0 : undefined}
        aria-label={onMinuteClick ? 'Long minute hand' : undefined}
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
          stroke="#e76f51"
          strokeWidth="5"
          strokeLinecap="round"
          className={`clock-hand-visible${reveal === 'minute' ? ' hand-reveal' : ''}`}
          transform={`rotate(${minuteAngle} 100 100)`}
        />
      </g>
      <circle cx="100" cy="100" r="6" fill="#17263c" />
    </svg>
  )
}

export default Clock
