import React from "react";

const width = "275px";

const ProgressBar = ({
  bgcolor,
  countdown,
  countdownTime,
  height,
  blackSmoke,
}) => {
  return (
    <div
      style={{
        top: "20px",
        margin: "0 auto",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        gap: "1rem",
        zIndex: 1,
      }}
    >
      <div
        style={{
          height,
          width,
          backgroundColor: blackSmoke,
          borderRadius: "40px",
          margin: "20px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(countdown / countdownTime) * 100}%`,
            backgroundColor: bgcolor,
            borderRadius: "40px",
          }}
        >
          <span
            style={{
              padding: "0px",
              color: "gold",
              fontWeight: 500,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {`${countdown}s`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
