import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Keyboard from "./components/Keyboard";
import iconGithub from "./assets/pic/icon-github.svg";
import "./App.css";

function App() {
  const [allowedKeys, setAllowedKeys] = useState("WASDQE");
  const [amountKeys, setAmountKeys] = useState(7);
  const [timer, setTimer] = useState(5.5);
  const [timerSwitch, setTimerSwitch] = useState(false);
  const [statsSwitch, setStatsSwitch] = useState(false);
  const [theme, setTheme] = useState("Light");

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
          theme={theme}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
