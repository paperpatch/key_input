import { Box } from '@mui/material';

const SuccessLongHorizontal = () => {
  return (
    <Box
      sx={{
        position:'absolute',
        top: '10px',
        left: '-10rem',
        right: '-10rem',
        borderRadius: 8,
        boxShadow: '0px 0px 40px 30px rgba(111, 209, 255, 0.1), 0px 0px 30px 30px rgba(111, 209, 255, 0.1)',
      }}
    ></Box>
  )
}

const SuccessMidHorizontal = () => {
  return (
    <Box
    sx={{
      position:'absolute',
      top: '10px',
      left: '-5rem',
      right: '-5rem',
      borderRadius: 8,
      boxShadow: '0px 0px 40px 30px rgba(111, 209, 255, 0.2), 0px 0px 30px 30px rgba(111, 209, 255, 0.2)',
    }}
    ></Box>
  )
}

const SuccessShortHorizontal = () => {
  return (
    <Box
      sx={{
        position:'absolute',
        top: '10px',
        left: '-1rem',
        right: '-1rem',
        borderRadius: 8,
        boxShadow: '0px 0px 40px 30px rgba(111, 209, 255, 0.2), 0px 0px 30px 30px rgba(111, 209, 255, 0.2)',
      }}
    ></Box>
  )
}

const SuccessCenter = () => {
  return (
    <Box
      sx={{
        position:'absolute',
        top: '10px',
        left: '70px',
        right: '70px',
        borderRadius: 8,
        boxShadow: '0px 0px 20px 15px rgba(255, 255, 255, 0.7), 0px 0px 20px 20px #97deff, 0px 0px 50px 50px rgba(111, 209, 255, 0.7)',
      }}
    ></Box>
  )
}

const SuccessPeakHorizontal = () => {
  return (
    <Box // Success Peak-Horizontal Fade
      sx={{
        position:'absolute',
        top: '10px',
        left: '-15rem',
        right: '-15rem',
        boxShadow: '0px 0px 5px 0.7px white, 0px 0px 30px 15px rgba(111, 209, 255, 0.7)',
      }}
    ></Box>
  )
}

const FailureLong = () => {
  return (
    <Box
      sx={{
        position:'absolute',
        top: '10px',
        left: '-10rem',
        right: '-10rem',
        boxShadow: '0px 0px 10px 50px rgba(0, 0, 0, 0.5)',
      }}
    ></Box>
  )
}

const FailureCenter = () => {
  return (
    <Box
      sx={{
        position:'absolute',
        top: '5px',
        left: '50px',
        right: '50px',
        borderRadius: 8,
        boxShadow: '0px 0px 30px 10px rgba(127, 25,	25, 0.7), 0px 0px 30px 20px rgba(0, 0, 0, 1)',
      }}
    ></Box>
  )
}

export {
  SuccessLongHorizontal,
  SuccessMidHorizontal,
  SuccessShortHorizontal,
  SuccessCenter,
  SuccessPeakHorizontal,
  FailureLong,
  FailureCenter,
}