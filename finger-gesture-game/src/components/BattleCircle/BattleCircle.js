import "components/BattleCircle/BattleCircle.css";

function BattleCircle(props) {
  const { style, imgUrl, text, conditionDirection, condition } = props;
  return (
    <div className="battle-container" style={style}>
      <div className="battle-warp">
        {conditionDirection === "right" && (
          <div className="battle-condition-container">
            <span className="battle-condition-warp">
              <p>
                What!
                {condition === "win"
                  ? "win!"
                  : condition === "lose"
                  ? "lose!"
                  : condition === "tie" && "what!"}
              </p>
            </span>
            <div class="triangle-1"></div>
          </div>
        )}
        <div className="battle-circle">
          <div className="battle-inside-circle">
            <img src={imgUrl} className="battle-img"></img>
          </div>
        </div>
        <h3 className="battle-txt flex">{text}</h3>
        {conditionDirection === "left" && (
          <div className="battle-condition-container">
            <span className="battle-condition-warp">
              <p>
                What!
                {condition === "win"
                  ? "win!"
                  : condition === "lose"
                  ? "lose!"
                  : condition === "tie" && "what!"}
              </p>
            </span>
            <div class="triangle-1"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattleCircle;
