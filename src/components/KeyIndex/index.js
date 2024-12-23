import css from "../../assets/scss/Main.module.scss";
import star from "../../assets/pic/star.png";

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
  <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
    {keys.split("").map((key, ix) => {
      const isFailed = failedKeys.includes(ix);
      const isCurrent = currentKeyIndex === ix;
      return (
        // Key Background
        <div
          key={ix}
          className={`${isFailed ? css.shakeAnimation : ""}`}
          style={{
            position: "relative",
            margin: 0.3,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "45px",
              height: "45px",
              backgroundColor:
                currentKeyIndex <= ix ? colors.white : colors.dimGrey,
              borderRadius: "5px",
              transform: isCurrent ? "translateY(-13px)" : undefined,
            }}
          >
            {/* Key Input */}
            <div
              style={{
                position: "absolute",
                width: "45px",
                height: "45px",
                color: isFailed
                  ? colors.red
                  : isCurrent
                  ? colors.gold
                  : colors.black,
                boxShadow: isFailed
                  ? "0px 0px 2px 3px red"
                  : isCurrent
                  ? "0px 0px 2px 3px #DEC20B, 0px 0px 30px 3px #DEC20B"
                  : "0px 0px 2px 3px black, 0px 0px 30px 3px black",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              {key.toUpperCase()}
            </div>
            {/* Line and blur below current key input */}
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "0px",
                top: "5rem",
                left: "-25px",
                color: "gold",
                zIndex: "tooltip",
                boxShadow: failedKeys.includes(ix)
                  ? "0px 0px 0px 0px black" // failed keys
                  : currentKeyIndex === ix
                  ? "0px 0px 0.5px 0.5px #B9A954, 0px -9px 25px 4px #B9A954, 0px -25px 25px 1px #B9A954, -60px -9px 25px 2px #B9A954, 60px -9px 25px 2px #B9A954" // current keys
                  : "0px 0px 0px 0px black", // forthcoming keys
              }}
            ></div>
            {/* Box (arrow) below current key input */}
            <div
              style={{
                width: "20px",
                height: "20px",
                top: "4.4rem",
                left: "13px",
                transform: "rotate(45deg)",
                position: "absolute",
                zIndex: "modal",
                backgroundColor: failedKeys.includes(ix)
                  ? colors.red
                  : currentKeyIndex === ix
                  ? colors.yellow
                  : colors.none,
                boxShadow: failedKeys.includes(ix)
                  ? "0px 0px 0px 0px black" // failed keys
                  : currentKeyIndex === ix
                  ? "0px 0px 15px 1px #B58B00" // current keys
                  : "0px 0px 0px 0px black", // forthcoming keys
              }}
            ></div>
            {/* Secondary Box (arrow) below current key for aesthetic purposes */}
            <div
              style={{
                position: "absolute",
                width: "10px",
                height: "10px",
                top: "4.8rem",
                left: "18px",
                transform: "rotate(45deg)",
                zIndex: "modal",
                boxShadow: failedKeys.includes(ix)
                  ? "0px 0px 0px 0px black" // failed keys
                  : currentKeyIndex === ix
                  ? "0px 0px 1px 2px #B58B00" // current keys
                  : "0px 0px 0px 0px black", // forthcoming keys
              }}
            ></div>
            {/* White background below arrow to block image */}
            <div
              style={{
                position: "absolute",
                width: "30rem",
                height: "50px",
                top: "5rem",
                left: "-20rem",
                backgroundColor: "white",
                zIndex: "tooltip",
              }}
            ></div>
          </div>
          {/* Star Animation */}
          {ix < currentKeyIndex && (
            <div
              className={css.starAnimation}
              style={{ position: "absolute", top: "-1.5rem" }}
            >
              <img src={star} width="100%" />
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export default KeyIndex;
