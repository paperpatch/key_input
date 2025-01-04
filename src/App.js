import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Keyboard from "./components/Keyboard";
import iconGithub from "./assets/pic/icon-github.svg";
import "./App.css";

function App() {
  const [allowedKeys, setAllowedKeys] = useState(
    localStorage.getItem("allowedKeys") || "WASDQE"
  );
  const [amountKeys, setAmountKeys] = useState(
    parseInt(localStorage.getItem("amountKeys")) || 7
  );
  const [timer, setTimer] = useState(
    parseFloat(localStorage.getItem("timer")) || 5.5
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [statsSwitch, setStatsSwitch] = useState(
    JSON.parse(localStorage.getItem("statsSwitch")) || true
  );
  const [timerSwitch, setTimerSwitch] = useState(
    JSON.parse(localStorage.getItem("timerSwitch")) || false
  );

  const saveSettings = () => {
    localStorage.setItem("allowedKeys", allowedKeys);
    localStorage.setItem("amountKeys", amountKeys);
    localStorage.setItem("timer", timer);
    localStorage.setItem("theme", theme);
    localStorage.setItem("statsSwitch", JSON.stringify(statsSwitch));
    localStorage.setItem("timerSwitch", JSON.stringify(timerSwitch));
  };

  useEffect(() => {
    saveSettings();
  }, [allowedKeys, amountKeys, timer, theme, statsSwitch, timerSwitch]);

  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  useEffect(() => {
    document.body.className = theme === "Light" ? "light-mode" : "dark-mode";
  }, [theme]);

  return (
    <BrowserRouter>
      <div className={theme === "Light" ? "light-mode" : "dark-mode"}>
        <header className="app-bar">
          <nav className="toolbar">
            <h1 className="title">Key Input</h1>
            <div className="input-group">
              <label htmlFor="allowed-keys">Allowed Keys Pool</label>
              <input
                type="text"
                className="text-field"
                placeholder="Allowed keys pool"
                value={allowedKeys}
                onChange={(e) => setAllowedKeys(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="amount-keys">Amount of Keys</label>
              <input
                type="number"
                className="text-field"
                placeholder="Amount of Keys"
                value={amountKeys}
                onChange={(e) => setAmountKeys(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="timer">Set Timer (seconds)</label>
              <input
                type="number"
                className="text-field"
                placeholder="Set Timer (seconds)"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="theme">Theme</label>
              <select
                className="select-field"
                value={theme}
                onChange={changeTheme}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </div>
            <button
              className={`toggle-button ${statsSwitch ? "active" : ""}`}
              onClick={() => setStatsSwitch((prev) => !prev)}
            >
              {statsSwitch ? "Stats" : "Stats"}
            </button>
            <a
              href="https://www.github.com/paperpatch/key_input"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="icon icon-github"
                src={iconGithub}
                alt="icon-github"
              />
            </a>
          </nav>
        </header>
        <Keyboard
          allowedKeys={allowedKeys}
          amountKeys={amountKeys}
          timer={timer}
          timerSwitch={timerSwitch}
          setTimerSwitch={setTimerSwitch}
          statsSwitch={statsSwitch}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
