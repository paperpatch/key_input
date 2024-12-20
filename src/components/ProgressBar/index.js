import React from "react";
import { Box } from "@mui/material";

const width = "275px";

const ProgressBar = ({
  bgcolor,
  countdown,
  countdownTime,
  height,
  blackSmoke,
}) => {
  const Parentdiv = {
    height: height,
    width: width,
    backgroundColor: blackSmoke,
    borderRadius: 40,
    margin: 20,
  };

  const Childdiv = {
    height: "100%",
    width: `${(countdown / countdownTime) * 100}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
  };

  const progressText = {
    padding: 10,
    color: "gold",
    fontWeight: 500,
    padding: "0px",
    paddingLeft: "125px",
    position: "absolute",
  };

  return (
    <Box
      sx={{
        top: "20px",
        mx: "auto",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        gap: 1,
        zIndex: "tooltip",
      }}
    >
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progressText}>{`${countdown}s`}</span>
        </div>
      </div>
    </Box>
  );
};

export default ProgressBar;
