import "./Stats.css";

const Stats = ({ scores }) => {
  const totalGames = scores.length;
  const totalTime = scores.reduce((acc, cur) => acc + parseFloat(cur.time), 0);
  const totalWins = scores.filter((s) => s.success).length;
  const totalCorrectKeys = scores.reduce(
    (acc, cur) =>
      acc +
      cur.keysPressed.reduce((sum, key) => sum + (cur.success ? 1 : 0), 0),
    0
  );
  const totalIncorrectKeys = scores.reduce(
    (acc, cur) => acc + (cur.failedKey ? 1 : 0),
    0
  );
  const totalKeys = totalCorrectKeys + totalIncorrectKeys;
  const winRate = totalGames
    ? ((totalWins / totalGames) * 100).toFixed(2)
    : "0.00";
  const averageKeyPressedPerSecond =
    totalTime > 0 ? (totalKeys / totalTime).toFixed(2) : "N/A";
  const lastTenResults = scores.slice(-10).reverse();

  const keyStats = {};
  scores.forEach(({ keysPressed, failedKey }) => {
    keysPressed.forEach((key) => {
      if (!keyStats[key]) {
        keyStats[key] = { correct: 0, incorrect: 0 };
      }

      if (failedKey === key) {
        keyStats[key].incorrect++;
      } else {
        keyStats[key].correct++;
      }
    });
  });

  const sortedKeys = Object.entries(keyStats).sort(
    ([, a], [, b]) => b.correct - a.correct
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
          const correctPercentage = (correct / total) * 100;
          const incorrectPercentage = (incorrect / total) * 100;

          return (
            <div className="key-bar" key={key}>
              <span className="key-label">{key}</span>
              <div className="bar">
                <div
                  className="bar-correct"
                  style={{ width: `${correctPercentage}%` }}
                />
                <div
                  className="bar-incorrect"
                  style={{ width: `${incorrectPercentage}%` }}
                />
              </div>
              <span className="key-count">{total}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Stats };
