import "./Stats.css";

const Stats = ({ scores, amountKeys, countdownTime }) => {
  const totalGames = scores.length;

  const validScores = scores.filter((s) => s.time && s.success);
  const totalTime = validScores.reduce((acc, cur) => acc + cur.time, 0);

  const averageTime =
    validScores.length > 0
      ? (totalTime / validScores.length / 1000).toFixed(2)
      : "N/A";

  const totalFailures = scores.filter((s) => !s.success).length;
  const failRate = totalGames
    ? ((totalFailures / totalGames) * 100).toFixed(2)
    : "0.00";

  const averageKeyPressedPerSecond =
    validScores.length > 0 && totalTime > 0
      ? (amountKeys / (totalTime / 1000)).toFixed(2)
      : "N/A";

  const bestTimes = validScores.sort((a, b) => a.time - b.time).slice(0, 5);

  const lastTenResults = scores.slice(-10);

  return (
    <div className="stats-container">
      <h3>Game Stats</h3>
      <div className="stats-summary">
        <div className="stat-bubble">
          <strong>Games Played:</strong>
          <p>{totalGames}</p>
        </div>
        <div className="stat-bubble">
          <strong>Average Time:</strong>
          <p>{averageTime}s</p>
        </div>
        <div className="stat-bubble">
          <strong>Fail Rate:</strong>
          <p>{failRate}%</p>
        </div>
        <div className="stat-bubble">
          <strong>Average Keys Pressed Per Second:</strong>
          <p>{averageKeyPressedPerSecond}</p>
        </div>
      </div>

      <h4>Last 10 Results</h4>
      <table className="stats-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Result</th>
            <th>Time Taken (s)</th>
            <th>Amount of Keys</th>
            <th>Initial Time</th>
            <th>Actions per second</th>
          </tr>
        </thead>
        <tbody>
          {lastTenResults.map((score, ix) => (
            <tr
              key={ix}
              className={score.success ? "success-row" : "failure-row"}
            >
              <td>{ix + 1}</td>
              <td>{score.success ? "Success" : "Failure"}</td>
              <td>{(score.time / 1000).toFixed(2)}</td>
              <td>{amountKeys || "N/A"}</td>
              <td>{countdownTime || "N/A"}</td>
              <td>
                {score.time && amountKeys
                  ? (amountKeys / (score.time / 1000)).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Top Times</h4>
      <table className="stats-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Time Taken (s)</th>
            <th>Amount of Keys</th>
          </tr>
        </thead>
        <tbody>
          {bestTimes.map((score, ix) => (
            <tr key={ix}>
              <td>{ix === 0 ? "⭐" : ix + 1}</td>
              <td style={{ fontWeight: ix === 0 ? "bold" : "normal" }}>
                {(score.time / 1000).toFixed(2)}
              </td>
              <td>{amountKeys || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Stats };
