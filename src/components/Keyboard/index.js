import { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

// import utils
import keySound from '../../assets/keySound.mp3';
import failSound from '../../assets/failSound.mp3';
import successSound from '../../assets/successSound.mp3';
import star from '../../assets/star.png';
import css from '../Keyboard.module.scss';
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
}

const classes = classNames.bind(css);

function Keyboard(set) {

  let allowedKeys = '';
  for (let o in set) {
    allowedKeys += set[o];
  }

  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showFailureText, setShowFailureText] = useState(false);
  const [keys, setKeys] = useState('');
  const [timer, setTimer] = useState(Date.now());
  const [scores, setScores] = useState([]);
  const [failedKeys, setFailedKeys] = useState([]);

  useEffect(() => {
    if (scores.length > 5) {
      setScores((prev) => {
        const newScores = [...prev];
        newScores.shift();
        return newScores;
      })
    }
  }, [scores]);

  const reset = useCallback(() => {
    if(!allowedKeys || allowedKeys.length === 0) return;
    let newKeys = '';

    for (let i=0; i < 7; i++) {
      newKeys += allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    }

    setCurrentKeyIndex(0);
    setKeys(newKeys);
    setTimer(Date.now());
    setFailedKeys([]);
  }, [setCurrentKeyIndex, setKeys, setTimer, setFailedKeys, allowedKeys]);

  useEffect(() => {
    reset();
  }, [allowedKeys, reset]);

  useEffect(() => {
    window.addEventListener('keydown', useKeyPress);
    return() => window.removeEventListener('keydown', useKeyPress);
  }, [currentKeyIndex, failedKeys, keys, timer, allowedKeys, reset]);

  const useKeyPress = (e) => {
    // if (!allowedKeys.split('').includes(e.key.toUpperCase())) {
    //   console.log('!allowedKeys');
    //   return;
    // }
    if (typeof e === 'string') {
      console.log('typeof e === string');
      return;
    }
    if (currentKeyIndex > keys.length - 1) {
      console.log('currentKeyIndex > keys.length -1');
      return
    };
    if (failedKeys.length > 0) {
      console.log('failedKeys.length > 0');
      return
    };
    if (e.key.toUpperCase() === keys[currentKeyIndex].toUpperCase()) {
      console.log('e.key.toUpperCase()');
      setCurrentKeyIndex((prev) => prev + 1);
      if (currentKeyIndex < keys.length - 1) {
        const keySoundFx = new Audio(keySound);
        keySoundFx.playbackRate = 2;
        keySoundFx.play();
      } else {
        const successSoundFx = new Audio(successSound);
        successSoundFx.playbackRate = 1.1;
        successSoundFx.play();
        setShowSuccessText(true);
        setTimeout(() => setShowSuccessText(false), 800);
      }
    } else {
      const failSoundFx = new Audio(failSound);
      failSoundFx.playbackRate = 1;
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
        setShowFailureText(false);
        reset();
      }, 700);
      return;
    }

    if (currentKeyIndex === keys.length - 1) {
      setScores((prev) => {
        return [
          ...prev,
          {
            time: Date.now() - timer,
            success: true,
          },
        ];
      });
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
        )}
        {showSuccessText && (
          <>
          <Typography
            variant="h6"
            className={classes(css.successAnimation)}
            sx={{
              textAlign: 'center',
              position: 'absolute',
              top: '-35px',
              left: '-100px',
              right: '-100px',
              fontSize: '50px',
              fontWeight: 'bold',
              WebkitTextStroke: '2px rgba(111, 209, 255, 0.7)',
              WebkitTextFillColor: '#FFFFFF',
              zIndex: 'tooltip',
              // boxShadow: '0px 0px 50px 20px rgba(111, 209, 255, 0.7)'
              // textShadow:
              //   '0 0 15px rgba(111, 209, 255, 0.7), 0 0 10px rgba(111, 209, 255, 0.7),0 0 21px rgba(111, 209, 255, 0.7),0 0 42px rgba(111, 209, 255, 0.7),0 0 82px rgba(111, 209, 255, 0.7),0 0 92px rgba(111, 209, 255, 0.7),0 0 102px rgba(111, 209, 255, 0.7),0 0 151px rgba(111, 209, 255, 0.7)',
            }}
          >
            SUCCESS
          </Typography>

          <Box // Semi-Long Blur
            sx={{
              position:'absolute',
              top: '10px',
              left: '-5rem',
              right: '-5rem',
              borderRadius: 8,
              boxShadow: '0px 0px 40px 30px rgba(111, 209, 255, 0.7), 0px 0px 30px 30px rgba(111, 209, 255, 0.7)',
            }}
          ></Box>
          <Box // Center Blur
            sx={{
              position:'absolute',
              top: '10px',
              left: '70px',
              right: '70px',
              borderRadius: 8,
              boxShadow: '0px 0px 20px 15px rgba(255, 255, 255, 0.7), 0px 0px 30px 30px #97deff, 0px 0px 50px 50px rgba(111, 209, 255, 0.7), 0px 0px 70px 70px rgba(111, 209, 255, 0.9)',
            }}
          ></Box>
          <Box // Long Blur
            sx={{
              position:'absolute',
              top: '10px',
              left: '-15rem',
              right: '-15rem',
              boxShadow: '0px 0px 5px 0.7px white, 0px 0px 30px 15px rgba(111, 209, 255, 0.7)',
            }}
          ></Box>
          </>
        )}
        {showFailureText && (
          <>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              position: 'absolute',
              top: '-18px',
              left: '-50px',
              right: '-50px',
              fontSize: '30px',
              fontWeight: 'bold',
              WebkitTextStroke: '2px rgba(127, 25, 25, 0.7)',
              WebkitTextFillColor: '#FFFFFF',
              zIndex: 'tooltip',
              // boxShadow: '0px 0px 50px 20px rgba(111, 209, 255, 0.7)'
              // textShadow:
              //   '0 0 15px rgba(111, 209, 255, 0.7), 0 0 10px rgba(111, 209, 255, 0.7),0 0 21px rgba(111, 209, 255, 0.7),0 0 42px rgba(111, 209, 255, 0.7),0 0 82px rgba(111, 209, 255, 0.7),0 0 92px rgba(111, 209, 255, 0.7),0 0 102px rgba(111, 209, 255, 0.7),0 0 151px rgba(111, 209, 255, 0.7)',
            }}
          >
            Failure
          </Typography>
          <Box // Long Blur
            sx={{
              position:'absolute',
              top: '10px',
              left: '-10rem',
              right: '-10rem',
              boxShadow: '0px 0px 10px 50px rgba(0, 0, 0, 0.5)',
            }}
          ></Box>
          <Box // Center Blur
            sx={{
              position:'absolute',
              top: '5px',
              left: '50px',
              right: '50px',
              borderRadius: 8,
              boxShadow: '0px 0px 30px 10px rgba(127, 25,	25, 0.7), 0px 0px 30px 20px rgba(0, 0, 0, 1)',
            }}
          ></Box>
          </>
        )}

        <Box
          textAlign="center"
          marginTop={10}
          sx={{ background: colors.white, borderRadius: '10px' }}
        >
          <Typography variant="h6">Last 5 scores</Typography>
          <Typography variant="h6">
            {scores.length > 0 &&
              `Average time: ${(
                scores
                  .filter((s) => s.success)
                  .reduce(
                    (acc, cur, ix, arr) => cur.time / arr.length + acc,
                    0,
                  ) / 1000
              ).toFixed(2)}s`}
          </Typography>
          {/* <Typography variant="h6">
            {scores.length > 0 &&
              `Fail rate: ${(
                (scores.filter((s) => !s.success).length / scores.length) *
                100
              ).toFixed(1)}%`}
          </Typography> */}
          {scores.map((scores, ix) => {
            return (
              <Typography
                key={ix}
                sx={{ color: scores.success ? 'green' : 'red' }}
              >
                {(scores.time / 1000).toFixed(2)}s
              </Typography>
            );
          })}
        </Box>
      </Box>
    </>
  )
}

export default Keyboard