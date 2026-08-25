function FractionBar({ numerator, denominator }) {
  return (
    <div className="fraction-bar" aria-label={`${numerator} out of ${denominator} equal parts shaded`}>
      {Array.from({ length: denominator }, (_, index) => (
        <span key={index} className={index < numerator ? 'shaded' : ''} />
      ))}
    </div>
  )
}

export default function LearningVisual({ visual }) {
  if (!visual) return null

  if (visual.type === 'fraction-bar') {
    return <div className="learning-visual"><FractionBar {...visual} /></div>
  }

  if (visual.type === 'double-bar') {
    return (
      <div className="learning-visual double-fraction-bar">
        {visual.fractions.map(([numerator, denominator]) => (
          <div key={`${numerator}-${denominator}`}>
            <FractionBar numerator={numerator} denominator={denominator} />
            <strong>{numerator}/{denominator}</strong>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="learning-visual group-visual" aria-label={`${visual.groups} equal groups of ${visual.perGroup}`}>
      {Array.from({ length: visual.groups }, (_, group) => (
        <div className="object-group" key={group}>
          {Array.from({ length: visual.perGroup }, (_, item) => <span key={item} />)}
        </div>
      ))}
    </div>
  )
}
