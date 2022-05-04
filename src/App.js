import {
  AppBar,
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
              Key Input
            </Typography>
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
    </BrowserRouter>
  )
};

export default App;