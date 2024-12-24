import "./Stats.css";

const Stats = ({ scores }) => {
  const totalGames = scores.length;
  const totalTime = scores.reduce((acc, cur) => acc + parseFloat(cur.time), 0);
  const totalWins = scores.filter((s) => s.success).length;
  const winRate = totalGames
    ? ((totalWins / totalGames) * 100).toFixed(2)
    : "0.00";
  const averageTime =
    totalGames > 0 ? (totalTime / totalGames).toFixed(2) : "N/A";
  const totalKeysPressed = scores.reduce(
    (acc, cur) => acc + cur.keysPressed,
    0
  );
  const averageKeyPressedPerSecond =
    totalTime > 0 ? (totalKeysPressed / totalTime).toFixed(2) : "N/A";

  const bestTimes = scores
    .filter((s) => s.success)
    .sort((a, b) => a.time - b.time)
    .slice(0, 5);
  const lastTenResults = scores.slice(-10).reverse();

  // console.log(scores);
  return (
    <div className="stats-container">
      <h3>Game Stats</h3>
      <div className="stats-summary">
        <div className="stat-bubble">
          <strong>Games Played:</strong>
          <p>{totalGames}</p>
        </div>
        <div className="stat-bubble">
          <strong>Pass Rate:</strong>
          <p>{winRate}%</p>
        </div>
        <div className="stat-bubble">
          <strong>Average Time:</strong>
          <p>{averageTime}s</p>
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
            <th>Keys Pressed</th>
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
              <td>{parseFloat(score.time).toFixed(2)}</td>
              <td>{score.keysPressed}</td>
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
            <th>Keys Pressed</th>
          </tr>
        </thead>
        <tbody>
          {bestTimes.map((score, ix) => (
            <tr key={ix}>
              <td>{ix === 0 ? <span className="star">⭐</span> : ix + 1}</td>
              <td>{parseFloat(score.time).toFixed(2)}</td>
              <td>{score.keysPressed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Stats };
