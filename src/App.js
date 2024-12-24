import { useCallback, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Keyboard from "./components/Keyboard";
import iconGithub from "./assets/pic/icon-github.svg";
import "./App.css";

function App() {
  const [showAppBar, setShowAppBar] = useState(true);
  const [allowedKeys, setAllowedKeys] = useState("WASDQE");
  const [amountKeys, setAmountKeys] = useState(7);
  const [timer, setTimer] = useState(5.5);
  const [timerSwitch, setTimerSwitch] = useState(false);
  const [statsSwitch, setStatsSwitch] = useState(true);
  const [theme, setTheme] = useState("");

  const handleScroll = useCallback(() => {
    setShowAppBar(window.scrollY < 25);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  return (
    <BrowserRouter>
      {showAppBar && (
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
              <input
                type="number"
                className="text-field"
                placeholder="Set Timer (seconds)"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
              />
              <label htmlFor="timer">Set Timer (seconds)</label>
            </div>
            <button
              className={`toggle-button ${timerSwitch ? "active" : ""}`}
              onClick={() => setTimerSwitch((prev) => !prev)}
            >
              {timerSwitch ? "Timer" : "Timer"}
            </button>
            <button
              className={`toggle-button ${statsSwitch ? "active" : ""}`}
              onClick={() => setStatsSwitch((prev) => !prev)}
            >
              {statsSwitch ? "Stats" : "Stats"}
            </button>
            <select
              className="select-field"
              value={theme}
              onChange={changeTheme}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="Blue">Blue</option>
            </select>
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
      )}
      <Keyboard
        allowedKeys={allowedKeys}
        amountKeys={amountKeys}
        timer={timer}
        timerSwitch={timerSwitch}
        statsSwitch={statsSwitch}
        theme={theme}
      />
    </BrowserRouter>
  );
}

export default App;
