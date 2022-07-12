// import packages
import { useCallback, useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';

// import components
import ProgressBar from '../ProgressBar';
import KeyIndex from '../KeyIndex';
import { Average } from '../Average';
import { SuccessText, FailureText } from '../Typography'
import { SuccessLongHorizontal, SuccessMidHorizontal, SuccessShortHorizontal, SuccessCenter, SuccessPeakHorizontal, FailureLong, FailureCenter } from '../FadeStyle'

// import utils
import keySound from '../../assets/sound/keySound.mp3';
import failSound from '../../assets/sound/tile_break.wav';
import successSound from '../../assets/sound/successSound.mp3';
import css from '../../assets/scss/Main.module.scss';


const colors = {
  white: 'white',
  red: '#7F1919',
  green: 'green',
  lighterGrey: '#C8C8C8',
  lightGrey: '#979797',
  dimGrey: '#696969',
  darkGrey: '#3F3F3F',
  gold: '#B9A954',
  yellow: '#FFEF00',
  black: 'black',
  skyBlue: 'rgb(37, 150, 190)',
  whiteSmoke: 'whitesmoke',
  blackSmoke: '#626262'
}



function Main(set) {
  const allowed = set.allowedKeys;
  const amount = set.amountKeys;
  const timerMode = set.timerMode;
  const averageMode = set.averageMode;
  const countdownTime = Number(set.timer);

  let allowedKeys = '';
  for (let o in allowed) {
    const regex = /^[A-Za-z]+$/;
    if (regex.test(allowed[o])) {
      allowedKeys += allowed[o];
    };
  }

  const [callReset, setCallReset] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showFailureText, setShowFailureText] = useState(false);
  const [keys, setKeys] = useState('');
  const [amountKeys, setAmountKeys] = useState(amount);
  const [countdown, setCountdown] = useState(countdownTime);
  const [timer, setTimer] = useState(Date.now());
  const [scores, setScores] = useState([]);
  const [failedKeys, setFailedKeys] = useState([]);

  const reset = useCallback(() => {
    if(!allowedKeys || allowedKeys.length === 0) return;
    let newKeys = '';

    if (amountKeys > 15) {
      setAmountKeys(15);;
    }

    for (let i=0; i < amountKeys; i++) {
      newKeys += allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    }

    setCurrentKeyIndex(0);
    setShowSuccessText(false);
    setShowFailureText(false);
    setKeys(newKeys);
    setAmountKeys(amount);
    setTimer(Date.now());
    setFailedKeys([]);
    setCountdown(countdownTime);
  }, [setCurrentKeyIndex, setKeys, setTimer, setFailedKeys, countdownTime, setCountdown, amount, amountKeys, allowedKeys]);

  // Initial Reset to Start the Game
  useEffect(() => {
    reset();
  }, [reset]);

  // Button Game Reset
  useEffect(() => {
    if (callReset) {
      reset();
    }
    setCallReset(false);
  }, [allowedKeys, callReset, reset]);

  // Update Scores
  useEffect(() => {
    if (scores.length > 5) {
      setScores((prev) => {
        const newScores = [...prev];
        newScores.shift();
        return newScores;
      })
    }
  }, [scores]);

  // Update Countdown
  useEffect(() => {
    if (countdown <= 0) {
      return failure();
    };

    const timerId = setInterval(() => {
      try {
        if (timerMode && countdown > 0) {
          setCountdown((countdown - .1).toFixed(1));
        } else {
          setCountdown(countdownTime);
        }
      }
      catch(err) {
        console.log(err);
      }
    }, 100);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(timerId);
    // add countdown as a dependency to rerun the effect when updated
  }, [countdown, timerMode])

  // 'Keydown' Listener
  useEffect(() => {
    window.addEventListener('keydown', useKeyPress);
    return() => window.removeEventListener('keydown', useKeyPress);
  }, [currentKeyIndex, keys, failedKeys, allowedKeys, reset]);

  function success() {
    setCountdown(10); // to prevent repeating countdown useEffect

    const successSoundFx = new Audio(successSound);
    successSoundFx.playbackRate = 1.1;
    successSoundFx.play();

    setScores((prev) => {
      return [
        ...prev,
        {
          time: Date.now() - timer,
          success: true,
        },
      ];
    });

    setShowSuccessText(true);
    setTimeout(() => {
      reset(); 
    }, 800);
  }

  function failure() {
    setCountdown(10);

    const failSoundFx = new Audio(failSound);
    failSoundFx.playbackRate = 1.5;
    failSoundFx.volume = 0.2;
    failSoundFx.play();

    setFailedKeys([...failedKeys, currentKeyIndex]);
    setScores((prev) => {
      return [
        ...prev,
        {
          time: Date.now() - timer,
          success: false
        },
      ];
    });

    setShowFailureText(true);
    setTimeout(() => {
      reset();
    }, 800);
  }

  const useKeyPress = (e) => {
    // if (!allowedKeys.split('').includes(e.key.toUpperCase())) {
    //   console.log('!allowedKeys');
    //   return;
    // }
    if (typeof e === 'string') {
      // console.log('typeof e === string');
      return;
    }
    if (!isNaN(e.key)) {
      // console.log('typeof e === number');
      return;
    }
    if (currentKeyIndex > keys.length - 1) {
      // console.log('currentKeyIndex > keys.length -1');
      return
    };
    if (failedKeys.length > 0) {
      // prevents further inputs when failure is true
      return
    };
    if (e.key.toUpperCase() === keys[currentKeyIndex].toUpperCase()) {
      setCurrentKeyIndex((prev) => prev + 1);
      if (currentKeyIndex < keys.length - 1) {
        const keySoundFx = new Audio(keySound);
        keySoundFx.playbackRate = 2;
        keySoundFx.play();
      } else {
        success();
      }
    } else {
      return failure();
    }

    if (currentKeyIndex === keys.length - 1) {

      setTimeout(() => {
        reset();
      }, 800);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {!showSuccessText && !showFailureText && (
        <>
        <KeyIndex keys={keys} css={css} failedKeys={failedKeys} currentKeyIndex={currentKeyIndex} colors={colors}/>
        <ProgressBar
          bgcolor={colors.skyBlue}
          countdown={countdown}
          countdownTime={countdownTime}
          height={30}
          blackSmoke={colors.blackSmoke}
        />
        <Button
          variant="contained"
          sx={{
            background: 'black',
            '&:hover': { background: 'blue'},
            '&:active': { background: 'blue'},
            width: '90px',
            margin: '0 auto',
            marginTop: '50px',
          }}
          onClick={() => setCallReset(true)}
        >
          Reset
        </Button>
      </>
        )}
        {showSuccessText && (
          <>
          {/* Typography */}
          <SuccessText />

          {/* CSS Fades */}
          <SuccessLongHorizontal />
          <SuccessMidHorizontal />
          <SuccessShortHorizontal />
          <SuccessCenter />
          <SuccessPeakHorizontal />

          </>
        )}
        {showFailureText && (
          <>
          {/* Typography */}
          <FailureText />

          {/* CSS Fades */}
          <FailureLong />
          <FailureCenter />
          </>
        )}

        {averageMode && (
          <Average
            scores={scores}
          />
        )}
      </Box>
    </>
  )
}

export default Main