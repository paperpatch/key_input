const Stats = ({ scores }) => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10rem",
        background: "white",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <h6>Last 10 results</h6>
      <h6>
        {scores.length > 0 && scores.some((s) => s.success)
          ? `Average time: ${(
              scores
                .filter((s) => s.success)
                .reduce((acc, cur, ix, arr) => cur.time / arr.length + acc, 0) /
              1000
            ).toFixed(2)}s`
          : "No successful attempts yet"}
      </h6>
      <h6>
        {scores.length > 0 &&
          `Fail rate: ${(
            (scores.filter((s) => !s.success).length / scores.length) *
            100
          ).toFixed(1)}%`}
      </h6>
      {scores.map((score, ix) => (
        <p
          key={ix}
          style={{ color: score.success ? "green" : "red", margin: "5px 0" }}
        >
          {(score.time / 1000).toFixed(2)}s
        </p>
      ))}
    </div>
  );
};

export { Stats };
