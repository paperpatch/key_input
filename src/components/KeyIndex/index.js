import css from "../../assets/scss/Main.module.scss";
import star from "../../assets/pic/star.png";
import "./KeyIndex.css";

const colors = {
  white: "#FFFFFF",
  red: "#7F1919",
  lighterGrey: "#C8C8C8",
  lightGrey: "#979797",
  dimGrey: "#696969",
  gold: "#B9A954",
  yellow: "#FFEF00",
  black: "black",
  skyBlue: "rgb(37, 150, 190)",
  blackSmoke: "#626262",
};

const KeyIndex = ({ keys, failedKeys, currentKeyIndex }) => (
  <div className="key-index-container">
    {keys.split("").map((key, ix) => {
      const isFailed = failedKeys.includes(ix);
      const isCurrent = currentKeyIndex === ix;
      return (
        <div
          key={ix}
          className={`key-box ${isFailed ? "failed-key" : ""} ${
            isCurrent ? "current-key" : ""
          } ${isFailed ? css.shakeAnimation : ""}`}
        >
          <div className="key-box">
            <div className="key-input">{key.toUpperCase()}</div>
            <div className="line-below-key"></div>
            <div className="arrow-below-key"></div>
            <div className="secondary-arrow"></div>
            <div className="arrow-background"></div>
          </div>
          {ix < currentKeyIndex && (
            <div className={`${css.starAnimation} star-animation`}>
              <img src={star} width="100%" alt="star" />
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export default KeyIndex;
