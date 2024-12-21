import { Box, Typography } from "@mui/material";

const Stats = ({ scores }) => {
  return (
    <Box
      textAlign="center"
      marginTop={10}
      sx={{ background: "white", borderRadius: "10px" }}
    >
      <Typography variant="h6">Last 5 results</Typography>
      <Typography variant="h6">
        {scores.length > 0 && scores.some((s) => s.success)
          ? `Average time: ${(
              scores
                .filter((s) => s.success)
                .reduce((acc, cur, ix, arr) => cur.time / arr.length + acc, 0) /
              1000
            ).toFixed(2)}s`
          : "No successful attempts yet"}
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
          <Typography key={ix} sx={{ color: scores.success ? "green" : "red" }}>
            {(scores.time / 1000).toFixed(2)}s
          </Typography>
        );
      })}
    </Box>
  );
};

export { Stats };
