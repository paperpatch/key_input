import React from 'react'

const width = '275px';

const ProgressBar = ({bgcolor, countdown, countdownTime, height, blackSmoke}) => {
  const Parentdiv = {
    height: height,
    width: width,
    backgroundColor: blackSmoke,
    borderRadius: 40,
    margin: 20
  }

  const Childdiv = {
    height: '100%',
    width: `${countdown/countdownTime*100}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
  }

  const progressText = {
    padding: 10,
    color: 'gold',
    fontWeight: 500,
    padding: '0px',
    paddingLeft: '125px',
    position: 'absolute',
  }

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progressText}>{`${countdown}s`}</span>
      </div>
    </div>
  )
}

export default ProgressBar;