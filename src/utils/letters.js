import React from 'react';
import useKeyPress from '../hooks/useKeyPress';

const setDisplayElement = document.getElementById('setDisplay')

function generate() {
  let result = '';
  const characters = 'WASDQE';
  const charactersLength = characters.length;

  for ( let i=0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

async function render() {
  const set = generate()
  setDisplayElement.innerHTML = ''
  set.split('').forEach(letter => {
    const letterSpan = document.createElement('span')
    letterSpan.classList.add('correct')
    letterSpan.innerText = letter
    setDisplayElement.appendChild(letterSpan)
  })
  setInputElement.value = null
}

export default render;