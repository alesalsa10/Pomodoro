import React, { useState, useEffect } from 'react';
import audio from '../sounds/done.mp3';
import Modal from 'react-modal';

export default function Timer() {
  const [pomodoroTime, setPomodoroTime] = useState('25');
  const [shortBreak, setShortBreak] = useState('05');
  const [longBreak, setLongBreak] = useState('10');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('30');
  const [startCountdown, setStartCountdown] = useState(false);
  const [action, setAction] = useState('START');
  const [selected, setSelected] = useState('pomodoro');
  const [indicator, setIndicator] = useState('');
  const [totalTime, setTotalTime] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  let doneSound = new Audio(audio);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  };

  Modal.setAppElement('body');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateTime() {
    if (startCountdown) {
      if (minutes == 0 && seconds == 0) {
        doneSound.play();
        setStartCountdown(false);
        setAction('DONE');
      } else {
        if (seconds == 0) {
          if (minutes > 0 && minutes <= 10) {
            setSeconds(59);
            setMinutes(`0${minutes - 1}`);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        } else if (seconds > 0 && seconds <= 10) {
          setSeconds(`0${seconds - 1}`);
        } else if (seconds > 10) {
          setSeconds(seconds - 1);
        }
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
    setTotalTime(parseInt(minutes) * 60 + parseInt(seconds));
  }, [selected, indicator]);

  const handleClicks = (e) => {
    setStartCountdown(false);
    setAction('START');
    setIndicator(Math.floor(Math.random() * 1000));
    setSeconds('00');
    if (e.target.id === 'pomodoro') {
      setMinutes(pomodoroTime);
      setSelected('pomodoro');
    } else if (e.target.id === 'short-break') {
      setMinutes(shortBreak);
      setSelected('shortBreak');
    } else {
      setMinutes(longBreak);
      setSelected('longBreak');
    }
  };

  useEffect(() => {
    const interval2 = setInterval(updateTime, 1000);
    return () => clearInterval(interval2);
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
            key={indicator}
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
      <div className='settingsImage'>
        <img
          src='https://cdn1.iconfinder.com/data/icons/interface-travel-and-environment/64/settings-cog-gear-interface-128.png'
          alt='Settings Icon'
          className='icon'
          onClick={openModal}
        />
      </div>
      <div className='modal'>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Settings Modal'
        >
          <h2>Settings</h2>
          <h3>TIME (MINUTES)</h3>
          {/* <button onClick={closeModal}>close</button> */}
          {/* <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form> */}
          <div className='configureTimes'>
            <div className='pomodoro'></div>
            <div className='shortBreak'></div>
            <div className='longBreak'></div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
