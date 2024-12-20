import {
  AppBar,
  Button,
  Slide,
  TextField,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";

// import css in order
import "./App.css";

function App() {
  const [showAppBar, setShowAppBar] = useState(true);
  const [allowedKeys, setAllowedKeys] = useState("WASDQE");
  const [amountKeys, setAmountKeys] = useState(7);
  const [timer, setTimer] = useState(5.5);
  const [timerMode, setTimerMode] = useState(true);
  const [averageMode, setAverageMode] = useState(true);
  const [theme, setTheme] = useState("");

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 25) {
      setShowAppBar(false);
    } else {
      setShowAppBar(true);
    }
  }, [setShowAppBar]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const changeTheme = (event) => {
    setTheme(event.target.value);
  };

  return (
    <BrowserRouter>
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar
          sx={{
            background: "rgba(0,0,0,0.5)",
            position: "fixed",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar sx={{ gap: 4 }}>
            <Typography variant="h5" noWrap>
              Key Input
            </Typography>
            <TextField
              label="Allowed keys pool"
              InputLabelProps={{
                sx: {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
              inputProps={{
                sx: {
                  color: "white",
                  background: "rgba(255,255,255,0.5)",
                  padding: "5px",
                },
              }}
              type="text"
              value={allowedKeys}
              onChange={(e) => {
                setAllowedKeys(e.target.value);
              }}
            />
            <TextField
              label="Amount of Keys"
              InputLabelProps={{
                sx: {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
              inputProps={{
                sx: {
                  color: "white",
                  background: "rgba(255,255,255,0.5)",
                  padding: "5px",
                },
              }}
              type="text"
              value={amountKeys}
              onChange={(e) => {
                setAmountKeys(e.target.value);
              }}
            />
            <TextField
              label="Set Timer (seconds)"
              InputLabelProps={{
                sx: {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
              inputProps={{
                sx: {
                  color: "white",
                  background: "rgba(255,255,255,0.5)",
                  padding: "5px",
                },
              }}
              type="text"
              value={timer}
              onChange={(e) => {
                setTimer(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{
                background: timerMode ? "blue" : "black",
                "&:hover": {
                  background: timerMode ? "blue" : "black",
                },
                "&:active": {
                  background: timerMode ? "blue" : "black",
                },
              }}
              onClick={() => setTimerMode((prev) => !prev)}
            >
              {timerMode ? "Timer on" : "Timer off"}
            </Button>
            <Button
              variant="contained"
              sx={{
                background: averageMode ? "blue" : "black",
                "&:hover": {
                  background: averageMode ? "blue" : "black",
                },
                "&:active": {
                  background: averageMode ? "blue" : "black",
                },
              }}
              onClick={() => setAverageMode((prev) => !prev)}
            >
              {averageMode ? "Average on" : "Average off"}
            </Button>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="theme-label">Theme</InputLabel>
                <Select
                  labelId="theme-label-id"
                  id="theme-id"
                  value={theme}
                  label="Theme"
                  onChange={changeTheme}
                >
                  <MenuItem value={"Light"}>Light</MenuItem>
                  <MenuItem value={"Dark"}>Dark</MenuItem>
                  <MenuItem value={"Blue"}>Blue</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      <Main
        allowedKeys={allowedKeys}
        amountKeys={amountKeys}
        timer={timer}
        timerMode={timerMode}
        averageMode={averageMode}
        theme={theme}
      />
    </BrowserRouter>
  );
}

export default App;
