import React from 'react';

// import components
import Preview from '../Preview';
import Speed from '../Speed';

// import utils
import useKeyPress from '../../utils/useKeyPress';
import renderWord from '../../utils/render';

function Display() {

  const set = renderWord();
  console.log(set);

  useKeyPress(key => {
    console.log(key);
  })

  const initialState = {
    text: 'Test',
    userInput: ''
  }

  const state = initialState;

  const onRestart = () => {
    setState(initialState)
  }

  const onUserInputChange = (e) => {
    const value = e.target.value;
    setState({
      useInput: value
    })
  }

  return (
    <div className="container mb-5 mb-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 setDisplay">
          <Preview />
          <textarea
            value={state.userInput}
            onChange={onUserInputChange}
            className="form-control mb-3"
            placeholder="Start typing..."
          ></textarea>
          <Speed />
          <div className="text-right">
            <button className="btn btn-light" onClick={onRestart}>Restart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Display