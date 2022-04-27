import React from 'react';

// import js libraries

// import css in order
import './App.css';

// import components
import Display from './components/Display';
import useKeyPress from './hooks/useKeyPress';
import generate from './utils/letters';

const initialLetter = generate();
console.log(initialLetter);

function App() {
  useKeyPress(key => {
    console.log(key);
  })
  
  return (
    <div>
      <>
        <Display />
      </>
    </div>
  );
}

export default App;
