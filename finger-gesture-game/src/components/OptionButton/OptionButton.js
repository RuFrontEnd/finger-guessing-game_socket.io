import "components/OptionButton/OptionButton.css";

function OptionButton(props) {
  const { style, imgUrl, text, condition } = props;
  return (
    <div className="option-container" style={style}>
      <div className="option-warp">
        <div className="option-circle">
          <div className="option-inside-circle">
            <img src={imgUrl} className="option-img"></img>
          </div>
        </div>
        <h3 className="option-txt flex">{text}</h3>
      </div>
    </div>
  );
}

export default OptionButton;
