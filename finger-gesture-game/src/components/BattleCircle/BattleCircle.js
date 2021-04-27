import "components/BattleCircle/BattleCircle.css";
import ConditionLabel from "components/ConditionLabel/ConditionLabel";

function BattleCircle(props) {
  const {
    style,
    imgUrl,
    text,
    conditionDirection,
    condition,
    ConditionLabelStyle,
  } = props;
  return (
    <div className="battle-container" style={style}>
      <div className="battle-warp">
        <div className="battle-circle">
          <div className="battle-inside-circle">
            <img src={imgUrl} className="battle-img"></img>
          </div>
        </div>
        <h3 className="battle-txt flex">{text}</h3>
        <ConditionLabel
          conditionDirection={conditionDirection}
          condition={condition}
          style={ConditionLabelStyle}
        />
      </div>
    </div>
  );
}

export default BattleCircle;
