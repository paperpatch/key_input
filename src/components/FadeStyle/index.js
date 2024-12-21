const SuccessLongHorizontal = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "-10rem",
      right: "-10rem",
      borderRadius: "8px",
      boxShadow:
        "0px 0px 40px 30px rgba(111, 209, 255, 0.1), 0px 0px 30px 30px rgba(111, 209, 255, 0.1)",
    }}
  />
);

const SuccessMidHorizontal = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "-5rem",
      right: "-5rem",
      borderRadius: 8,
      boxShadow:
        "0px 0px 40px 30px rgba(111, 209, 255, 0.2), 0px 0px 30px 30px rgba(111, 209, 255, 0.2)",
    }}
  />
);

const SuccessShortHorizontal = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "-1rem",
      right: "-1rem",
      borderRadius: 8,
      boxShadow:
        "0px 0px 40px 30px rgba(111, 209, 255, 0.2), 0px 0px 30px 30px rgba(111, 209, 255, 0.2)",
    }}
  />
);

const SuccessCenter = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "70px",
      right: "70px",
      borderRadius: 8,
      boxShadow:
        "0px 0px 20px 15px rgba(255, 255, 255, 0.7), 0px 0px 20px 20px #97deff, 0px 0px 50px 50px rgba(111, 209, 255, 0.7)",
    }}
  />
);

const SuccessPeakHorizontal = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "-15rem",
      right: "-15rem",
      boxShadow:
        "0px 0px 5px 0.7px white, 0px 0px 30px 15px rgba(111, 209, 255, 0.7)",
    }}
  />
);

const FailureLong = () => (
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "-10rem",
      right: "-10rem",
      boxShadow: "0px 0px 10px 50px rgba(0, 0, 0, 0.5)",
    }}
  />
);

const FailureCenter = () => (
  <div
    style={{
      position: "absolute",
      top: "5px",
      left: "50px",
      right: "50px",
      borderRadius: 8,
      boxShadow:
        "0px 0px 30px 10px rgba(127, 25,	25, 0.7), 0px 0px 30px 20px rgba(0, 0, 0, 1)",
    }}
  />
);

export {
  SuccessLongHorizontal,
  SuccessMidHorizontal,
  SuccessShortHorizontal,
  SuccessCenter,
  SuccessPeakHorizontal,
  FailureLong,
  FailureCenter,
};
