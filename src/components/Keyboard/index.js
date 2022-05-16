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
  red: '#ff3232',
  green: 'green',
  lighterGrey: '#C8C8C8',
  lightGrey: '#979797',
  dimGrey: '#696969',
  darkGrey: '#3F3F3F',
  gold: '#B9A954',
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
  const [keys, setKeys] = useState('');
  const [timer, setTimer] = useState(Date.now());
  const [scores, setScores] = useState([]);
  const [failedKeys, setFailedKeys] = useState([]);

  useEffect(() => {
    if (scores.length > 10) {
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

    for (let i=0; i < 8; i++) {
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
    if (!allowedKeys.split('').includes(e.key.toUpperCase())) {
      return;
    }
    if (typeof e === 'string') {
      return;
    }
    if (currentKeyIndex > keys.length - 1) {
      return
    };
    if (failedKeys.length > 0) {
      return
    };
    if (e.key.toUpperCase() === keys[currentKeyIndex].toUpperCase()) {
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
      setTimeout(() => {
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
          gap: '6ffpx',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          {keys.split('').map((key, ix) => {
            return (
              <Box
                key={ix}
                className={classes({
                  [css.shakeAnimation]: failedKeys.includes(ix),
                })}
                sx={{ position: 'relative' }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '45px',
                    height: '45px',
                    // backgroundColor: failedKeys.includes(ix)
                    //   ? colors.red
                    //   : colors.gold,
                    backgroundColor: currentKeyIndex <= ix ? colors.white : colors.dimGrey,
                    // opacity: currentKeyIndex <= ix ? 1 : 0.5,
                    borderRadius: '5px',
                    boxShadow:
                      currentKeyIndex === ix && !failedKeys.includes(ix)
                        ? '-1px 4px 25px -3px colors.gold'
                        : '-1px 4px 15px -3px colors.black',
                    transform:
                      currentKeyIndex === ix ? 'translateY(-13px)' : undefined,
                  }}
                >
                  <Box
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
                        ? colors.black
                        : currentKeyIndex === ix
                        ? colors.gold
                        : colors.black,
                      boxShadow: failedKeys.includes(ix)
                        ? '0px 0px 2px 3px #B9A954' // failed keys
                        : currentKeyIndex === ix
                        ? '0px 0px 2px 3px #B9A954' // current keys
                        : '0px 0px 2px 3px black', // forthcoming keys
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
                </div>
                {ix < currentKeyIndex && (
                  <Box
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
        {showSuccessText && (
          <Typography
            variant="h6"
            className={classes(css.successAnimation)}
            sx={{
              textAlign: 'center',
              position: 'absolute',
              top: '-50px',
              left: '-100px',
              right: '-100px',
              fontSize: '78px',
              fontWeight: 'bold',
              WebkitTextStroke: '2px rgba(111, 209, 255, 0.7)',
              WebkitTextFillColor: '#FFFFFF',
              backgroundColor: 'white',
              textShadow:
                '0 0 7px rgba(111, 209, 255, 0.7), 0 0 10px rgba(111, 209, 255, 0.7),0 0 21px rgba(111, 209, 255, 0.7),0 0 42px rgba(111, 209, 255, 0.7),0 0 82px rgba(111, 209, 255, 0.7),0 0 92px rgba(111, 209, 255, 0.7),0 0 102px rgba(111, 209, 255, 0.7),0 0 151px rgba(111, 209, 255, 0.7)',
            }}
          >
            Success
          </Typography>
        )}

        <Box
          textAlign="center"
          marginTop={10}
          sx={{ background: colors.white, borderRadius: '10px' }}
        >
          <Typography variant="h6">Last 10 scores</Typography>
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
          <Typography variant="h6">
            {scores.length > 0 &&
              `Fail rate: ${(
                (scores.filter((s) => !s.success).length / scores.length) *
                100
              ).toFixed(1)}%`}
          </Typography>
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