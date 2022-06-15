import { Typography } from "@mui/material";
import css from '../../assets/scss/Keyboard.module.scss';
import classNames from "classnames";

const classes = classNames.bind(css);

const SuccessText = () => {
  return (
    <Typography
      variant="h6"
      className={classes(css.successAnimation)}
      sx={{
        textAlign: 'center',
        position: 'absolute',
        top: '-35px',
        left: '-100px',
        right: '-100px',
        fontSize: '50px',
        fontWeight: 'bold',
        WebkitTextStroke: '2px rgba(111, 209, 255, 0.7)',
        WebkitTextFillColor: '#FFFFFF',
        zIndex: 'tooltip',
        // boxShadow: '0px 0px 50px 20px rgba(111, 209, 255, 0.7)'
        // textShadow:
        //   '0 0 15px rgba(111, 209, 255, 0.7), 0 0 10px rgba(111, 209, 255, 0.7),0 0 21px rgba(111, 209, 255, 0.7),0 0 42px rgba(111, 209, 255, 0.7),0 0 82px rgba(111, 209, 255, 0.7),0 0 92px rgba(111, 209, 255, 0.7),0 0 102px rgba(111, 209, 255, 0.7),0 0 151px rgba(111, 209, 255, 0.7)',
      }}
    >
      SUCCESS
    </Typography>
  )
}

const FailureText = () => {
  return (
    <Typography
      variant="h6"
      sx={{
        textAlign: 'center',
        position: 'absolute',
        top: '-18px',
        left: '-50px',
        right: '-50px',
        fontSize: '30px',
        fontWeight: 'bold',
        WebkitTextStroke: '2px rgba(127, 25, 25, 0.7)',
        WebkitTextFillColor: '#FFFFFF',
        zIndex: 'tooltip',
        // boxShadow: '0px 0px 50px 20px rgba(111, 209, 255, 0.7)'
        // textShadow:
        //   '0 0 15px rgba(111, 209, 255, 0.7), 0 0 10px rgba(111, 209, 255, 0.7),0 0 21px rgba(111, 209, 255, 0.7),0 0 42px rgba(111, 209, 255, 0.7),0 0 82px rgba(111, 209, 255, 0.7),0 0 92px rgba(111, 209, 255, 0.7),0 0 102px rgba(111, 209, 255, 0.7),0 0 151px rgba(111, 209, 255, 0.7)',
      }}
    >
      Failure
    </Typography>
  )
}

export { SuccessText, FailureText }