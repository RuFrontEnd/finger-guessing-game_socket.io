import "components/ConditionLabel/ConditionLabel.css";

function BattleCircle(props) {
  const { style, conditionDirection, condition } = props;
  return (
    <div style={style}>
      {conditionDirection === "right" && (
        <div className="battle-condition-container battle-condition-container-right">
          <span className="battle-condition-warp">
            <p>
              {condition === "win"
                ? "win!"
                : condition === "lose"
                ? "lose!"
                : condition === "tie" && "what!"}
            </p>
          </span>
          <div class="triangle-1 triangle-right"></div>
        </div>
      )}
      {conditionDirection === "left" && (
        <div className="battle-condition-container battle-condition-container-left">
          <span className="battle-condition-warp">
            <p>
              {condition === "win"
                ? "win!"
                : condition === "lose"
                ? "lose!"
                : condition === "tie" && "what!"}
            </p>
          </span>
          <div class="triangle-1 triangle-left"></div>
        </div>
      )}
    </div>
  );
}

export default BattleCircle;
