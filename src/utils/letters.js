import React from 'react';

function generate() {
  let result = '';
  const characters = 'WASDQE';
  const charactersLength = characters.length;

  for ( let i=0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export default generate;