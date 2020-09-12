import React, { useState, useEffect } from 'react';
import Button from './Button';
import audio from '../sounds/done.mp3';
import audio2 from '../sounds/mouse-click.mp3';

export default function Timer() {
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [startCountdown, setStartCountdown] = useState(false);
  const [backGroundColor, setBackgroundColor] = useState(
    'rgba(83, 144, 217, 1)'
  );
  const [work, setWork] = useState(true);

  let doneSound = new Audio(audio);
  let clickSound = new Audio(audio2);
  let bodyStyle = document.body.style;
  bodyStyle.backgroundColor = backGroundColor;

  function updateTime() {
    if (minutes == 0 && seconds == 0) {
      doneSound.play();
      setStartCountdown(false);
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
    if (e.target.className === 'start') {
      setStartCountdown(true);
      clickSound.play();
    } else {
      setStartCountdown(false);
      clickSound.play();
    }
  };

  const handleClicks = (e) => {
    if (e.target.id === 'pomodoro') {
      setMinutes('25');
      setSeconds('00');
      setBackgroundColor('rgba(83, 144, 217, 1)');
      setWork(true);
      bodyStyle.transition = '0.3s linear';
      bodyStyle.backgroundColor = backGroundColor;
      setStartCountdown(true);
    } else if (e.target.id === 'short-break') {
      setMinutes('05');
      setSeconds('00');
      setWork(false);
      setBackgroundColor('rgb(72, 191, 227, 1)');
      bodyStyle.transition = '0.3s linear';
      bodyStyle.backgroundColor = backGroundColor;
      setStartCountdown(true);
    } else {
      setMinutes('10');
      setSeconds('00');
      setWork(false);
      setBackgroundColor('rgb(114, 239, 221)');
      bodyStyle.transition = '0.3s linear';
      bodyStyle.backgroundColor = backGroundColor;
      setStartCountdown(true);
    }
  };

  useEffect(() => {
    if (startCountdown) {
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [startCountdown, seconds]);

  return (
    <div>
      <div className='timer-card'>
        <Button
          className='buttons'
          value='Pomodoro'
          onClick={handleClicks}
          id='pomodoro'
        />
        <Button
          className='buttons'
          value='Short Break'
          onClick={handleClicks}
          id='short-break'
        />
        <Button
          className='buttons'
          value='Long Break'
          onClick={handleClicks}
          id='long-break'
        />
        <h1 className='time'>
          <span>{minutes}</span>:<span>{seconds} </span>{' '}
        </h1>
        {startCountdown ? (
          <Button
            color={backGroundColor}
            id='start-stop'
            className='stop'
            onClick={handleStartStopClick}
            value='Stop'
          />
        ) : (
          <Button
            color={backGroundColor}
            id='start-stop'
            className='start'
            onClick={handleStartStopClick}
            value='Start'
          />
        )}
      </div>
      {work ? (
        <p className='action'>Work Time</p>
      ) : (
        <p className='action'>Break time</p>
      )}
    </div>
  );
}
