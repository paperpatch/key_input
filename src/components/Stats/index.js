import "./Stats.css";

const Stats = ({ scores }) => {
  const totalGames = scores.length;
  const totalWins = scores.filter((s) => s.success).length;
  const totalLosses = totalGames - totalWins;
  const winRate = totalGames
    ? ((totalWins / totalGames) * 100).toFixed(2)
    : "0.00";

  const totalTime = scores.reduce((acc, cur) => acc + parseFloat(cur.time), 0);
  const averageTime =
    totalGames > 0 ? (totalTime / totalGames).toFixed(2) : "N/A";

  const totalKeysPressed = scores.reduce(
    (acc, cur) => acc + cur.keysPressed.length,
    0
  );
  const apm = totalTime > 0 ? (totalKeysPressed / totalTime).toFixed(2) : "N/A";

  const keyStats = {};
  scores.forEach(({ keysPressed, success }) => {
    if (!keysPressed) return;
    keysPressed.forEach((key) => {
      if (!keyStats[key]) {
        keyStats[key] = { correct: 0, incorrect: 0 };
      }
      if (!success) {
        keyStats[key].incorrect++;
      } else {
        keyStats[key].correct++;
      }
    });
  });

  const mostFailedKey = scores.reduce((mostFailed, { failedKey, success }) => {
    if (!success && failedKey !== null) {
      if (!mostFailed[failedKey]) mostFailed[failedKey] = 0;
      mostFailed[failedKey]++;
    }
    return mostFailed;
  }, {});

  const mostFailedKeyEntry = Object.entries(mostFailedKey).reduce(
    (max, [key, count]) => (count > max.count ? { key, count } : max),
    { key: "N/A", count: 0 }
  );

  const lastTenResults = scores.slice(-10).reverse();

  const sortedKeys = Object.entries(keyStats).sort(
    ([, a], [, b]) => b.correct + b.incorrect - (a.correct + a.incorrect)
  );

  const maxKeyCount = Math.max(
    0,
    ...Object.values(keyStats).map((stats) => stats.correct + stats.incorrect)
  );

  return (
    <div className="stats-container">
      <div className="stats-summary">
        <div className="stats-main">
          {/* Stats Grid 1 */}
          <div className="stats-grid">
            <div className="stat-item-left">
              <div className="stat-left">
                <p>GAMES PLAYED</p>
                <p>{totalGames}</p>
              </div>
              <i className="icon trophy-icon" />
            </div>
            <div className="stat-item-left">
              <div className="stat-left">
                <p>WINS</p>
                <p>{totalWins}</p>
              </div>
              <i className="icon trophy-icon" />
            </div>
            <div className="stat-item-left">
              <div className="stat-left">
                <p>LOSS</p>
                <p>{totalLosses}</p>
              </div>
              <i className="icon thumbs-down-icon" />
            </div>
          </div>

          {/* Win Ratio Circle */}
          <div className="win-ratio">
            <svg className="circle" viewBox="0 0 36 36">
              <path
                className="circle-background"
                d="M18 2.0845 a 15.9155 15.9155 0 1 0 0 31.831 a 15.9155 15.9155 0 1 0 0 -31.831"
              />
              {totalGames > 0 && (
                <>
                  {/* Wins */}
                  <path
                    className="circle-progress wins"
                    strokeDasharray={`${(totalWins / totalGames) * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 1 0 0 31.831 a 15.9155 15.9155 0 1 0 0 -31.831"
                  />
                  {/* Losses */}
                  <path
                    className="circle-progress losses"
                    strokeDasharray={`${(totalLosses / totalGames) * 100}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 1 0 0 31.831 a 15.9155 15.9155 0 1 0 0 -31.831"
                    strokeDashoffset={`-${(totalWins / totalGames) * 100}`}
                  />
                </>
              )}
              <text x="18" y="12" className="ratio-text">{`${winRate}%`}</text>
              <text x="18" y="20" className="win-ratio-label">
                Win Ratio
              </text>
            </svg>
          </div>

          {/* Stats Grid 2 */}
          <div className="stats-grid">
            <div className="stat-item-right">
              <i className="icon timer-icon" />
              <div className="stat-right">
                <p>AVERAGE TIME</p>
                <p>{averageTime}s</p>
              </div>
            </div>
            <div className="stat-item-right">
              <i className="icon apm-icon" />
              <div className="stat-right">
                <p>ACTIONS PER MINUTE</p>
                <p>{apm}</p>
              </div>
            </div>
            <div className="stat-item-right">
              <i className="icon failed-key-icon" />
              <div className="stat-right">
                <p>MOST FAILED KEY</p>
                <p>{mostFailedKeyEntry.key || "N/A"}</p>
              </div>
            </div>
          </div>
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
              <td>{parseFloat(score.time).toFixed(1)}</td>
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
