import css from "../../assets/scss/Main.module.scss";
import star from "../../assets/pic/star.png";
import "./KeyIndex.css";

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
