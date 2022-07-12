import { Box } from '@mui/material';

// import utils
import classNames from 'classnames'
import css from '../../assets/scss/Main.module.scss';
import star from '../../assets/pic/star.png';

const classes = classNames.bind(css);

const KeyIndex = ({keys, css, failedKeys, currentKeyIndex, colors}) => {
  return (

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
  )
}

export default KeyIndex;