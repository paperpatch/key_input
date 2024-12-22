const ProgressBar = ({
  bgcolor,
  countdown,
  countdownTime,
  height,
  blackSmoke,
}) => {
  const progressWidth = `${Math.min((countdown / countdownTime) * 100, 100)}%`;

  return (
    <div
      style={{
        top: "20px",
        margin: "0 auto",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height,
          width: "100%",
          backgroundColor: blackSmoke,
          borderRadius: "40px",
          margin: "20px",
          overflow: "hidden", 
        }}
      >
        <div
          style={{
            height: "100%",
            width: progressWidth,
            backgroundColor: bgcolor,
            borderRadius: "40px",
            transition: "width 0.1s ease-in-out",
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
