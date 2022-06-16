// import packages
import { useCallback, useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';

// import components
import ProgressBar from '../ProgressBar';
import { Average } from '../Average';
import { SuccessText, FailureText } from '../Typography'
import { SuccessLongHorizontal, SuccessMidHorizontal, SuccessShortHorizontal, SuccessCenter, SuccessPeakHorizontal, FailureLong, FailureCenter } from '../Fade'

// import utils
import keySound from '../../assets/sound/keySound.mp3';
import failSound from '../../assets/sound/tile_break.wav';
import successSound from '../../assets/sound/successSound.mp3';
import star from '../../assets/pic/star.png';
import css from '../../assets/scss/Keyboard.module.scss';
import classNames from 'classnames'

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

const classes = classNames.bind(css);

function Keyboard(set) {
  const allowed = set.allowedKeys;
  const amountKeys = set.amountKeys;
  const timerMode = set.timerMode;
  const averageMode = set.averageMode;
  const countdownTime = Number(set.timer);
  const resetMode = set.reset;

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
  const [countdown, setCountdown] = useState(countdownTime);
  const [timer, setTimer] = useState(Date.now());
  const [scores, setScores] = useState([]);
  const [failedKeys, setFailedKeys] = useState([]);

  const reset = useCallback(() => {
    if(!allowedKeys || allowedKeys.length === 0) return;
    let newKeys = '';

    for (let i=0; i < amountKeys; i++) {
      newKeys += allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    }

    setCurrentKeyIndex(0);
    setShowSuccessText(false)
    setShowFailureText(false);
    setKeys(newKeys);
    setTimer(Date.now());
    setFailedKeys([]);
    setCountdown(countdownTime);
  }, [setCurrentKeyIndex, setKeys, setTimer, setFailedKeys, setCountdown, countdownTime, allowedKeys]);

  function success() {
    setCountdown(10); // to prevent repeating countdown messages

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
    setCountdown(10); // to start countdown again when timerMode is turned off and on

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

  // Initial Reset to Start the Game
  useEffect(() => {
    reset();
  }, [allowedKeys, countdownTime, setCountdown, reset]);

  // Initial Reset to Start the Game
  useEffect(() => {
    if (callReset) {
      reset();
    }
    setCallReset(false);
  }, [allowedKeys, countdownTime, setCountdown, callReset, reset]);

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
  }, [countdown])

  // 'Keydown' Listener
  useEffect(() => {
    window.addEventListener('keydown', useKeyPress);
    return() => window.removeEventListener('keydown', useKeyPress);
  }, [allowedKeys, currentKeyIndex, showSuccessText, showFailureText, keys, countdown, countdownTime, timer, scores, failedKeys, reset]);

  const useKeyPress = (e) => {
    // if (!allowedKeys.split('').includes(e.key.toUpperCase())) {
    //   console.log('!allowedKeys');
    //   return;
    // }
    if (typeof e === 'string') {
      console.log('typeof e === string');
      return;
    }
    if (!isNaN(e.key)) {
      // console.log('typeof e === number');
      return;
    }
    if (currentKeyIndex > keys.length - 1) {
      console.log('currentKeyIndex > keys.length -1');
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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          {keys.split('').map((key, ix) => {
            return (
              <Box // Key Background
                key={ix}
                className={classes({
                  [css.shakeAnimation]: failedKeys.includes(ix),
                })}
                sx={{
                  position: 'relative',
                  m: 0.3,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '45px',
                    height: '45px',
                    backgroundColor: currentKeyIndex <= ix ? colors.white : colors.dimGrey,
                    borderRadius: '5px',
                    transform:
                      currentKeyIndex === ix ? 'translateY(-13px)' : undefined,
                  }}
                >
                  <Box // Key Input
                    sx={{
                      position: 'absolute',
                      // top: '-3px',
                      width: '45px',
                      height: '45px',
                      // backgroundColor: failedKeys.includes(ix)
                      //   ? colors.red
                      //   : currentKeyIndex === ix
                      //   ? colors.white // current key
                      //   : colors.white, // all other key
                      color: failedKeys.includes(ix)
                        ? colors.red
                        : currentKeyIndex === ix
                        ? colors.gold
                        : colors.black,
                      boxShadow: failedKeys.includes(ix)
                        ? '0px 0px 2px 3px red' // failed keys
                        : currentKeyIndex === ix
                        ? '0px 0px 2px 3px #DEC20B, 0px 0px 30px 3px #DEC20B' // current keys
                        : '0px 0px 2px 3px black, 0px 0px 30px 3px black', // forthcoming keys
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '30px',
                    }}
                  >
                    {key.toUpperCase()}
                  </Box>
                  <Box // Line and blur below current key input
                    sx={{
                      width: '100px',
                      height: '0px',
                      top: '5rem',
                      left: '-25px',
                      color: 'gold',
                      position: 'absolute',
                      zIndex: 'tooltip',
                      boxShadow: failedKeys.includes(ix)
                        ? '0px 0px 0px 0px black' // failed keys
                        : currentKeyIndex === ix
                        ? '0px 0px 0.5px 0.5px #B9A954, 0px -9px 25px 4px #B9A954, 0px -25px 25px 1px #B9A954, -60px -9px 25px 2px #B9A954, 60px -9px 25px 2px #B9A954' // current keys
                        : '0px 0px 0px 0px black', // forthcoming keys
                    }}
                  >
                  </Box>
                  <Box // Box (arrow) below current key input
                    sx={{
                      width: '20px',
                      height: '20px',
                      top: '4.4rem',
                      left: '13px',
                      transform: 'rotate(45deg)',
                      position: 'absolute',
                      zIndex: 'modal',
                      backgroundColor: failedKeys.includes(ix)
                        ? colors.red
                        : currentKeyIndex === ix
                        ? colors.yellow
                        : colors.none,
                      boxShadow: failedKeys.includes(ix)
                        ? '0px 0px 0px 0px black' // failed keys
                        : currentKeyIndex === ix
                        ? '0px 0px 15px 1px #B58B00' // current keys
                        : '0px 0px 0px 0px black', // forthcoming keys
                    }}
                  >
                  </Box>
                  <Box // secondary Box (arrow) below current key input
                    sx={{
                      width: '10px',
                      height: '10px',
                      top: '4.8rem',
                      left: '18px',
                      transform: 'rotate(45deg)',
                      position: 'absolute',
                      zIndex: 'modal',
                      boxShadow: failedKeys.includes(ix)
                        ? '0px 0px 0px 0px black' // failed keys
                        : currentKeyIndex === ix
                        ? '0px 0px 1px 2px #B58B00' // current keys
                        : '0px 0px 0px 0px black', // forthcoming keys
                    }}
                  >
                  </Box>
                  <Box // White background to block half of box (arrow)
                    sx={{
                      width: '50rem',
                      height: '50px',
                      top: '5rem',
                      left: '-30rem',
                      backgroundColor: 'white',
                      position: 'absolute',
                      zIndex: 'tooltip',
                      // boxShadow: failedKeys.includes(ix)
                      // ? '0px 0px 0px 0px black' // failed keys
                      // : currentKeyIndex === ix
                      // ? '0px 0px 1px 1px #B9A954' // current keys
                      // : '0px 0px 0px 0px black', // forthcoming keys
                    }}
                  >
                  </Box>
                </div>
                {ix < currentKeyIndex && (
                  <Box // Star animation
                    className={classes(css.starAnimation)}
                    sx={{
                      position: 'absolute',
                      top: '-1.5rem',
                    }}
                  >
                    <img src={star} width="100%" />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
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

export default Keyboard