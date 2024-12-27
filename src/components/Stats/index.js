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
    (acc, cur) => acc + cur.keysPressed.length,
    0
  );
  const averageKeyPressedPerSecond =
    totalTime > 0 ? (totalKeysPressed / totalTime).toFixed(2) : "N/A";

  const lastTenResults = scores.slice(-10).reverse();

  const keyStats = {};
  scores.forEach(({ keysPressed, success }) => {
    keysPressed.forEach((key, index) => {
      if (!keyStats[key]) {
        keyStats[key] = { correct: 0, incorrect: 0 };
      }

      if (!success && index === keysPressed.length - 1) {
        keyStats[key].incorrect++;
      } else {
        keyStats[key].correct++;
      }
    });
  });

  const sortedKeys = Object.entries(keyStats).sort(
    ([, a], [, b]) => b.correct + b.incorrect - (a.correct + a.incorrect)
  );

  const maxKeyCount = Math.max(
    0,
    ...Object.values(keyStats).map((stats) => stats.correct + stats.incorrect)
  );

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
            <th>Failed Key</th>
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
              <td>{score.failedKey}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Key Press Graph</h4>
      <div className="key-graph">
        {sortedKeys.map(([key, { correct, incorrect }]) => {
          const total = correct + incorrect;
          const barWidth = (total / maxKeyCount) * 100;
          const correctWidth = (correct / total) * 100;
          const incorrectWidth = (incorrect / total) * 100;

          return (
            <div className="key-bar" key={key}>
              <span className="key-label">{key}</span>
              <span className="key-count">{total}</span>
              <div className="bar-container" style={{ width: "100%" }}>
                <div
                  className="bar"
                  style={{ width: `${barWidth}%`, maxWidth: "100%" }}
                >
                  <div
                    className="bar-correct"
                    style={{ width: `${correctWidth}%` }}
                  >
                    {correct > 0 && <span className="bar-text">{correct}</span>}
                  </div>
                  <div
                    className="bar-incorrect"
                    style={{ width: `${incorrectWidth}%` }}
                  >
                    {incorrect > 0 && (
                      <span className="bar-text">{incorrect}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Stats };
