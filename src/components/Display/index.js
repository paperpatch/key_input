import React, { useState } from 'react';

// import utils
import useKeyPress from '../../utils/useKeyPress';
import renderWord from '../../utils/render';

const set = renderWord().split('');
console.log(set);

function Display() {

  const [userInput, setUserInput] = useState('');
  const [count, setCount] = useState(0);

  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

  useKeyPress(value => {
    if (value === set[count]) {
      setActiveLetterIndex(index => index + 1)
    } else {
      setActiveLetterIndex(index => index = 0)
    }
    console.log(value);
  })

  return (
    <>
    <div className="container mb-5 mb-5">
      <h1>Key Input</h1>
      <h4>{set.map((letter, index) => {
        if (index === activeLetterIndex) {
          return <b>{letter}</b>
        }

        return <span>{letter}</span>
      })}</h4>
      <input
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
      
    </div>
    </>
  )
}

export default Display