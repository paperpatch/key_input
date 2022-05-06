import { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

// import utils
import useKeyPress from '../../utils/useKeyPress';
import renderWord from '../../utils/render';
// import keySound from '../assets/keySound.mp3';
// import failSound from '../assets/failSound.mp3';
// import successSound from '../assets/successSound.mp3';
// import star from '../assets/star.png';
import css from '../Keyboard.module.scss';
import classNames from 'classnames'

const classes = classNames.bind(css);

const set = renderWord().split('');
console.log('set', set);

// let allowedKeys = [];
// for (let o in input) {
//   allowedKeys.push(input[o]);
// }

// console.log('allowedKeys', allowedKeys)

function Keyboard(allowedKeys) {

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

  useKeyPress(value => {
    console.log(value);
    if (!allowedKeys.split('').includes(value.key.toLowerCase())) {
      return;
    }
  })

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
                    backgroundColor: failedKeys.includes(ix)
                      ? 'rgba(225, 15, 15, 1)'
                      : 'rgba(170, 170, 170, 1)',
                    opacity: currentKeyIndex <= ix ? 1 : 0.5,
                    borderRadius: '6px',
                    boxShadow:
                      currentKeyIndex === ix && !failedKeys.includes(ix)
                        ? '-1px 4px 25px -3px #e1dbb6'
                        : '-1px 4px 15px -3px rgba(0,0,0,0.43)',
                    transform:
                      currentKeyIndex === ix ? 'translateY(-8px)' : undefined,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '-3px',
                      width: '45px',
                      height: '45px',
                      backgroundColor: failedKeys.includes(ix)
                        ? 'rgba(255, 50, 50, 1)'
                        : currentKeyIndex === ix
                        ? '#e1dbb6'
                        : 'rgba(200, 200, 200, 1)',
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
                      top: '-2px',
                    }}
                  >
                    <img src={Star} width="100%" />
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
              top: '-135px',
              left: '-100px',
              right: '-100px',
              fontSize: '78px',
              fontWeight: 'bold',
              WebkitTextStroke: '2px rgba(111, 209, 255, 0.7)',
              WebkitTextFillColor: '#FFFFFF',
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
          sx={{ background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}
        >
          <Typography variant="h6">Last 10 scores</Typography>
          <Typography variant="h6">
            {scores.length > 0 &&
              `Average time: ${(
                setScores
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