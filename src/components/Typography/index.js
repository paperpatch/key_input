import { Typography } from "@mui/material";
import css from "../../assets/scss/Main.module.scss";
import classNames from "classnames";

const classes = classNames.bind(css);

const SuccessText = () => {
  return (
    <Typography
      variant="h6"
      className={classes(css.successAnimation)}
      sx={{
        textAlign: "center",
        position: "absolute",
        top: "-35px",
        left: "-100px",
        right: "-100px",
        fontSize: "50px",
        fontWeight: "bold",
        WebkitTextStroke: "2px rgba(111, 209, 255, 0.7)",
        WebkitTextFillColor: "#FFFFFF",
        zIndex: "tooltip",
      }}
    >
      SUCCESS
    </Typography>
  );
};

const FailureText = () => {
  return (
    <Typography
      variant="h6"
      sx={{
        textAlign: "center",
        position: "absolute",
        top: "-18px",
        left: "-50px",
        right: "-50px",
        fontSize: "30px",
        fontWeight: "bold",
        WebkitTextStroke: "2px rgba(127, 25, 25, 0.7)",
        WebkitTextFillColor: "#FFFFFF",
        zIndex: "tooltip",
      }}
    >
      Failure
    </Typography>
  );
};

export { SuccessText, FailureText };
