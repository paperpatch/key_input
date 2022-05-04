import {
  AppBar,
  Box,
  Button,
  Container,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Keyboard from './components/Keyboard';

// import css in order
import './App.css';

function App() {
  const [showAppBar, setShowAppBar] = useState(true);
  const [allowedKeys, setAllowedKeys] = useState('WASDQE');

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 25) {
      setShowAppBar(false);
    } else {
      setShowAppBar(true);
    }
  }, [setShowAppBar]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })

  return (
    <BrowserRouter>
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar
          sx={{
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar sx={{ gap: 4 }}>
            <Typography variant="h5" noWrap>
              Lost Ark Typing Practice
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: easyMode ? 'crimson' : 'green',
                '&:hover': {
                  background: easyMode ? 'crimson' : 'green',
                },
                '&:active': {
                  background: easyMode ? 'crimson' : 'green',
                },
              }}
              onClick={() => setEasyMode((prev) => !prev)}
            >
              {easyMode ? 'Toggle hard mode' : 'Toggle easy mode'}
            </Button>
            <TextField
              label="Allowed keys pool"
              InputLabelProps={{
                sx: {
                  color: 'white',
                  '&.Mui-focused': {
                    color: 'white',
                  },
                },
              }}
              inputProps={{
                sx: {
                  color: 'white',
                  background: 'rgba(255,255,255,0.5)',
                  padding: '5px',
                },
              }}
              type="text"
              value={allowedKeys}
              onChange={(e) => {
                setAllowedKeys(e.target.value);
              }}
            />
          </Toolbar>
        </AppBar>
      </Slide>
      <Keyboard allowedKeys={allowedKeys} />
      {!easyMode && (
        <Box position="absolute" bottom="5%" right="6%">
          <Typography variant="h6" color="white">
            Vykas Fanart by
            <br />
            <a
              style={{ color: 'rgba(100, 100, 250, 1)' }}
              target="_blank"
              rel="noreferrer"
              href="https://www.pixiv.net/en/users/14279898"
            >
              Test | Test
            </a>
          </Typography>
        </Box>
      )}
    </BrowserRouter>
  )
};

export default App;