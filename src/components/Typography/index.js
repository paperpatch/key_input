const SuccessText = () => (
  <div
    style={{
      textAlign: "center",
      position: "absolute",
      top: "-35px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "50px",
      fontWeight: "bold",
      color: "#FFFFFF",
      textStroke: "2px rgba(111, 209, 255, 0.7)",
    }}
  >
    SUCCESS
  </div>
);

const FailureText = () => (
  <div
    style={{
      textAlign: "center",
      position: "absolute",
      top: "-18px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "30px",
      fontWeight: "bold",
      color: "#FFFFFF",
      textStroke: "2px rgba(127, 25, 25, 0.7)",
    }}
  >
    FAILURE
  </div>
);

export { SuccessText, FailureText };
