import React, { useState, useEffect, useRef } from 'react';
import audio from '../sounds/done.mp3';

export default function Timer() {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('20');
  const [startCountdown, setStartCountdown] = useState(false);
  const [action, setAction] = useState('START');
  const [selected, setSelected] = useState('pomodoro');

  const [totalTime, setTotalTime] = useState();

  let doneSound = new Audio(audio);

  function updateTime() {
    if (minutes == 0 && seconds == 0) {
      doneSound.play();
      setStartCountdown(false);
      setAction('DONE')
    } else {
      if (seconds == 0) {
        if (minutes > 0 && minutes <= 10) {
          setMinutes(`0${minutes - 1}`);
          setSeconds(59);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else if (seconds > 0 && seconds <= 10) {
        setSeconds(`0${seconds - 1}`);
      } else if (seconds > 10) {
        setSeconds(seconds - 1);
      }
    }
  }

  const handleStartStopClick = (e) => {
    if (e.target.id === 'start') {
      setStartCountdown(true);
      setAction('PAUSE');
    } else {
      setStartCountdown(false);
      setAction('START');
    }
  };

  useEffect(() => {
    setTotalTime(parseInt(minutes) * 60 + parseInt(seconds) +1);
  }, [selected]);

  const handleClicks = (e) => {
    setStartCountdown(false);
    setAction('START')
    if (e.target.id === 'pomodoro') {
      setMinutes('00');
      setSeconds('30');
      setSelected('pomodoro');
    } else if (e.target.id === 'short-break') {
      setMinutes('00');
      setSeconds('30');
      setSelected('shortBreak');
    } else {
      setMinutes('10');
      setSeconds('00');
      setSelected('longBreak');
    }
  };

  useEffect(() => {
    if (startCountdown) {
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [startCountdown, seconds, minutes]);

  return (
    <div>
      <div className='timer-card'>
        <div className='buttons-div'>
          <div
            className={`${'buttons'} ${
              selected === 'pomodoro' ? 'selected' : ''
            } `}
            id='pomodoro'
            onClick={handleClicks}
          >
            Pomodoro
          </div>
          <div
            className={`${'buttons'} ${
              selected === 'shortBreak' ? 'selected' : ''
            } `}
            id='short-break'
            onClick={handleClicks}
          >
            Short Break
          </div>
          <div
            className={`${'buttons'} ${
              selected === 'longBreak' ? 'selected' : ''
            } `}
            id='long-break'
            onClick={handleClicks}
          >
            Long Break
          </div>
        </div>

        <svg viewBox='0 0 10 10' width='30%'>
          <circle
            cx='5'
            cy='5'
            r='4'
            strokeWidth='0.5'
            stroke='#282b52'
            fill='none'
          />
          <circle
            cx='5'
            cy='5'
            r='3.3'
            fill='transparent'
            stroke='#1b2242'
            strokeWidth='0.3'
          />

          <circle
            className='circle'
            cx='5'
            cy='5'
            r='3.3'
            key={selected}
            fill='none'
            stroke='#f57172'
            strokeWidth='0.3'
            style={{
              animationDuration: `${totalTime}s `,
              animationPlayState: `${
                action === 'START' ? 'paused' : 'running'
              }`,
            }}
          />

          <text
            x='5'
            y='5'
            textAnchor='middle'
            fill='white'
            alignmentBaseline='central'
            fontSize='2px'
          >
            {minutes}:{seconds}
          </text>
          <text
            x='5'
            y='7'
            textAnchor='middle'
            fill='white'
            alignmentBaseline='central'
            fontSize='0.9px'
            onClick={handleStartStopClick}
            className={`${'startStop'} `}
            id={`${startCountdown ? 'stop' : 'start'}`}
          >
            {action}
          </text>
        </svg>
      </div>
    </div>
  );
}
