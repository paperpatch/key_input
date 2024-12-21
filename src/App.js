import { useCallback, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Keyboard from "./components/Keyboard";
import "./App.css";

// import css in order
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
            <input
              type="text"
              className="text-field"
              placeholder="Allowed keys pool"
              value={allowedKeys}
              onChange={(e) => setAllowedKeys(e.target.value)}
            />
            <input
              type="number"
              className="text-field"
              placeholder="Amount of Keys"
              value={amountKeys}
              onChange={(e) => setAmountKeys(e.target.value)}
            />
            <input
              type="number"
              className="text-field"
              placeholder="Set Timer (seconds)"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
            />
            <button
              className={`toggle-button ${timerSwitch ? "active" : ""}`}
              onClick={() => setTimerSwitch((prev) => !prev)}
            >
              {timerSwitch ? "TIMER ON" : "TIMER OFF"}
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
