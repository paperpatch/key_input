import { Box, Typography } from '@mui/material';

const Average = ({scores}) => {
  return (
    <Box
      textAlign="center"
      marginTop={10}
      sx={{ background: 'white', borderRadius: '10px' }}
    >
      <Typography variant="h6">Last 5 scores</Typography>
      <Typography variant="h6">
        {scores.length > 0 &&
          `Average time: ${(
            scores
              .filter((s) => s.success)
              .reduce(
                (acc, cur, ix, arr) => cur.time / arr.length + acc,
                0,
              ) / 1000
          ).toFixed(2)}s`}
      </Typography>
      {/* <Typography variant="h6">
        {scores.length > 0 &&
          `Fail rate: ${(
            (scores.filter((s) => !s.success).length / scores.length) *
            100
          ).toFixed(1)}%`}
      </Typography> */}
      {scores.map((scores, ix) => {
        return (
          <Typography
            key={ix}
            sx={{ color: scores.success ? 'green' : 'red' }}
          >
            {(scores.time / 1000).toFixed(2)}s
          </Typography>
        );
      })}
    </Box>
  )
}

export { Average };