const EcoScore = (props) =>
{
    const score = props.children

    return (
         <div className="eco-score">
          <span className="eco-score__text">🍃 эко-баллы: </span>
          <span className="eco-score__num">{score}</span>
        </div>
    )
}

export default EcoScore