import React, { useState, useEffect } from 'react';
import audio from '../sounds/done.mp3';
import Modal from 'react-modal';

export default function Timer() {
  const [pomodoroTime, setPomodoroTime] = useState('25');
  const [shortBreak, setShortBreak] = useState('05');
  const [longBreak, setLongBreak] = useState('10');

  const [pomodoroSetting, setPomodoroSetting] = useState(pomodoroTime);
  const [shortBreakSetting, setShortBreakSetting] = useState(shortBreak);
  const [longBreakSetting, setLongBreakSetting] = useState(longBreak);

  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState('00');

  const [font, setFont] = useState('roboto');
  const [fontSetting, setFontSetting] = useState(font);

  const [startCountdown, setStartCountdown] = useState(false);
  const [action, setAction] = useState('START');
  const [selected, setSelected] = useState('pomodoro');
  const [indicator, setIndicator] = useState();
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
      width: '400px',
      borderRadius: '15px',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  };

  Modal.setAppElement('body');

  function openModal() {
    setStartCountdown(false);
    setAction('START');
    setIsOpen(true);
  }

  function closeModal() {
    setStartCountdown(false);
    setAction('START');
    setIsOpen(false);
    setIndicator(Math.floor(Math.random() * 1000));
  }

  function updateTime() {
    if (minutes == 0 && seconds == 0) {
      doneSound.play();
      setStartCountdown(false);
      setAction('DONE');
    } else {
      if (seconds == 0) {
        if (parseInt(minutes) > 0 && parseInt(minutes) < 10) {
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

  const handleStartStopClick = (e) => {
    if (e.target.id === 'start') {
      setStartCountdown(true);
      setAction('PAUSE');
    } else {
      setStartCountdown(false);
      setAction('START');
    }
  };

  const handleTimeClicks = (e) => {
    setStartCountdown(false);
    setIndicator(Math.floor(Math.random() * 1000));
    setSeconds('00');
    setAction('START');
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

  const handleNumberChange = (e) => {
    if (e.target.id === 'pomodoro') {
      if (e.target.value < 10) {
        setPomodoroSetting(`0${e.target.value}`);
      } else {
        setPomodoroSetting(e.target.value);
      }
    } else if (e.target.id === 'shortBreak') {
      if (e.target.value < 10) {
        setShortBreakSetting(`0${e.target.value}`);
      } else {
        setShortBreakSetting(e.target.value);
      }
    } else {
      if (e.target.value < 10) {
        setLongBreakSetting(`0${e.target.value}`);
      } else {
        setLongBreakSetting(e.target.value);
      }
    }
  };

  const handleFontClick = (e) => {
    if (e.target.id === 'roboto') {
      setFontSetting('roboto');
    } else if (e.target.id === 'lato') {
      setFontSetting('lato');
    } else {
      setFontSetting('xanhMono');
    }
  };

  const handleApplySettings = (e) => {
    setSeconds('00');
    setPomodoroTime(pomodoroSetting);
    setShortBreak(shortBreakSetting);
    setLongBreak(longBreakSetting);
    setFont(fontSetting);
    closeModal();
  };

  useEffect(() => {
    setTotalTime(parseInt(minutes) * 60 + parseInt(seconds));
  }, [selected, indicator]);

  useEffect(() => {
    const interval = setTimeout(function () {
      if (!startCountdown) {
        //do nothing
        
      } else {
        updateTime();
      }
    }, 1000);
    return () => interval;
  }, [startCountdown, seconds, minutes]);

  useEffect(() => {
    if (selected === 'pomodoro') {
      setMinutes(pomodoroTime);
    } else if (selected === 'shortBreak') {
      setMinutes(shortBreak);
    } else {
      setMinutes(longBreak);
    }
  }, [
    pomodoroSetting,
    shortBreakSetting,
    longBreakSetting,
    pomodoroTime,
    shortBreak,
    longBreak,
  ]);

  return (
    <div
      className={`${
        font === 'roboto' ? 'roboto' : font === 'lato' ? 'lato' : 'xanhMono'
      }`}
    >
      <div className={`${'timerCard'}`}>
        <div className='buttons-div'>
          <div
            className={`${'buttons'} ${
              selected === 'pomodoro' ? 'selected' : ''
            } `}
            id='pomodoro'
            onClick={handleTimeClicks}
          >
            Pomodoro
          </div>
          <div
            className={`${'buttons'} ${
              selected === 'shortBreak' ? 'selected' : ''
            } `}
            id='short-break'
            onClick={handleTimeClicks}
          >
            Short Break
          </div>
          <div
            className={`${'buttons'} ${
              selected === 'longBreak' ? 'selected' : ''
            } `}
            id='long-break'
            onClick={handleTimeClicks}
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
          <div
            className={`${
              font === 'roboto'
                ? 'roboto'
                : font === 'lato'
                ? 'lato'
                : 'xanhMono'
            }`}
          >
            <h2>Settings</h2>
            <h4>TIME (MINUTES)</h4>
            <div className='configureTimes'>
              <div className='pomodoro'>
                <div className='header'>pomodoro</div>
                <input
                  type='number'
                  name='pomodoro'
                  id='pomodoro'
                  defaultValue={parseInt(pomodoroTime)}
                  max='60'
                  min='5'
                  onChange={handleNumberChange}
                />
              </div>
              <div className='shortBreak'>
                <div className='header'>short break</div>
                <input
                  type='number'
                  name='shortBreak'
                  id='shortBreak'
                  defaultValue={parseInt(shortBreak)}
                  max='15'
                  min='1'
                  onChange={handleNumberChange}
                />
              </div>
              <div className='longBreak'>
                <div className='header'>long break</div>
                <input
                  type='number'
                  name='longBreak'
                  id='longBreak'
                  defaultValue={parseInt(longBreak)}
                  max='25'
                  min='5'
                  onChange={handleNumberChange}
                />
              </div>
            </div>
            <div className='configureFont'>
              <h4 className='header fontColor '>FONT</h4>
              <div
                className='roboto fonts'
                id='roboto'
                onClick={handleFontClick}
              >
                Aa
              </div>
              <div
                className='xanhMono fonts'
                id='xanhMono'
                onClick={handleFontClick}
              >
                Aa
              </div>
              <div className='lato fonts' id='lato' onClick={handleFontClick}>
                Aa
              </div>
            </div>
            <div className='configureColor'>
              <h4 className='header fontColor '>COLOR</h4>
              <div className='color colorRed '>Aa</div>
              <div className='color colorBlue '>Aa</div>
              <div className='color colorPurple '>Aa</div>
            </div>
            <div className='applyButton' onClick={handleApplySettings}>
              Apply
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
