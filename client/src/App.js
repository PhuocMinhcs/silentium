import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';

function App() {
  const [activeId, setActiveId] = useState(0);
  const step = ['blue', 'green', 'yellow'];

  useEffect(() => {
    axios.get(`/transition/current-step`)
      .then(function (response) {
        const { data } = response;

        if (!data.error) setActiveId(step.indexOf(data.currentStep[0]) + 1);
      })
      .catch(function (error) {
        const { response } = error;
        const { data } = response;

        if (data.error) window.alert(data.message);
      })
  }, [step]);

  const handleClick = (id) => {
    console.log(activeId)
    if (activeId === id) return;

    axios.get(`/transition/step/${step[id - 1]}`)
      .then(function (response) {
        const { data } = response;

        if (!data.error) setActiveId(id);
      })
      .catch(function (error) {
        const { response } = error;
        const { data } = response;

        if (data.error) window.alert(data.message);
      })
  };

  const handleReset = () => {
    if (activeId === 1 || activeId === 0) return;

    axios.post(`/transition/reset`)
      .then(function (response) {
        const { data } = response;

        if (!data.error) handleClick(1);;
      })
      .catch(function (error) {
        const { response } = error;
        const { data } = response;

        if (data.error) window.alert(data.message);
      })
  };

  return (
    <div className="App">
      <div className="col">
        <div className="content">
          <button
            className={`button round${activeId === 1 ? ' active' : ''}`}
            onClick={() => handleClick(1)}
          >
            <span>blue</span>
          </button>
        </div>
      </div>

      <div className="col">
        <div className="content">
          <button
            className={`button round${activeId === 2 ? ' active' : ''}`}
            onClick={() => handleClick(2)}
          >
            <span>green</span>
          </button>

          <button
            className={`button round${activeId === 3 ? ' active' : ''}`}
            onClick={() => handleClick(3)}
          >
            <span>yellow</span>
          </button>
        </div>
      </div>

      <div className="col">
        <div className="content">
          <button className="button" onClick={() => handleReset(1)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
