import React, { useState, useEffect } from 'react';
import audio from '../sounds/done.mp3';
import Modal from 'react-modal';
import Navbar from '../components/Navbar';

export default function Timer() {
  const [pomodoroTime, setPomodoroTime] = useState('25');
  const [shortBreak, setShortBreak] = useState('05');
  const [longBreak, setLongBreak] = useState('10');

  const [pomodoroSetting, setPomodoroSetting] = useState(pomodoroTime);
  const [shortBreakSetting, setShortBreakSetting] = useState(shortBreak);
  const [longBreakSetting, setLongBreakSetting] = useState(longBreak);

  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');

  const [font, setFont] = useState('roboto');
  const [fontSetting, setFontSetting] = useState(font);


  const [color, setColor] = useState('red');
  const [colorSetting, setColorSetting] = useState(color);
  
  const [startCountdown, setStartCountdown] = useState(false);


  const [action, setAction] = useState('START');
  const [selected, setSelected] = useState('pomodoro');
  const [indicator, setIndicator] = useState();
  const [totalTime, setTotalTime] = useState(1500);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [progress, setProgress] = useState(0);
  const [offset, setOffset] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(parseInt(minutes * 60) + parseInt(seconds))

  let doneSound = new Audio(audio);

  Modal.setAppElement('body');

  function openModal() {
    setStartCountdown(false);
    setAction('START');
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setFontSetting(font);
    setColorSetting(color);
  }

  function updateTime() {
    if (minutes == 0 && seconds == 0) {
      doneSound.play();
      setStartCountdown(false);
      setAction('DONE');
    } else {
      if (seconds == 0) {
        if (minutes > 0 &&  minutes <= 10) {
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
    } else if (e.target.id === 'stop'){
      setStartCountdown(false);
      setAction('START');
    }
  };

  let interval;

  const handleTimeClicks = (e) => {
    setStartCountdown(true);
    setIndicator(Math.floor(Math.random() * 1000));
    setSeconds('00');
    setAction('PAUSE');
    clearTimeout(interval);
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

  const handleColorClick = (e) => {
    if (e.target.id === 'red') {
      setColorSetting('red');
    } else if (e.target.id === 'blue') {
      setColorSetting('blue');
    } else {
      setColorSetting('purple');
    }
  };

  const handleApplySettings = (e) => {
    setIndicator(Math.floor(Math.random() * 1000));
    setSeconds('00');
    setPomodoroTime(pomodoroSetting);
    setShortBreak(shortBreakSetting);
    setLongBreak(longBreakSetting);
    setFont(fontSetting);
    setColor(colorSetting);
    setIsOpen(false);
  };

  const calculateProgress = () => {
    setSecondsLeft(parseInt(minutes * 60) + parseInt(seconds))
    
    if (totalTime === secondsLeft){
      setProgress(0);
      setOffset(0);
    }else {
      setProgress(100 - (secondsLeft * 100 / totalTime));
      const progressOffset = 20.73 - (((100 - progress) / 100) * 20.73);
      setOffset(progressOffset);
    }
  }

  useEffect(()=>{
    const int = setInterval(calculateProgress(minutes, seconds), 500);
    return () => clearInterval(int);
  })



  useEffect(() => {
    if (selected === 'pomodoro'){
      setTotalTime(parseInt(pomodoroTime) * 60)
    } else if (selected === 'shortBreak'){
      setTotalTime(parseInt(shortBreak) * 60)
    } else {
      setTotalTime(parseInt(longBreak) * 60)
    }
  }, [selected, indicator]);

  useEffect(() => {
    interval = setTimeout(function () {
      if (!startCountdown) {
        //do nothing
      } else {
        updateTime();
      }
    }, 1000);
    return () => clearTimeout(interval);
  }, [startCountdown, seconds, minutes]);

  

  useEffect(() => {
    if (selected === 'pomodoro') {
      setMinutes(pomodoroTime);
      setSecondsLeft(parseInt(minutes) * 60)
    } else if (selected === 'shortBreak') {
      setMinutes(shortBreak);
      setSecondsLeft(parseInt(minutes) * 60)
    } else {
      setMinutes(longBreak);
      setSecondsLeft(parseInt(minutes) * 60)
    }
  }, [
    pomodoroSetting,
    shortBreakSetting,
    longBreakSetting,
    pomodoroTime,
    shortBreak,
    longBreak,
    indicator
  ]);

  return (
    <div className={`${font}`}>
      <Navbar />
      <div className={`${'timerCard'}`}>
        <div className='buttons-div'>
          <div
            className={`${'buttons'} ${
              selected === 'pomodoro' ? 'selected' : ''
            } ${
              color === 'red' && selected === 'pomodoro'
                ? 'selectedRed'
                : color === 'blue' && selected === 'pomodoro'
                ? 'selectedBlue'
                : color === 'purple' && selected === 'pomodoro'
                ? 'selectedPurple'
                : ''
            } `}
            id='pomodoro'
            onClick={handleTimeClicks}
          >
            Pomodoro
          </div>
          <div
            className={`${'buttons'} ${
              selected === 'shortBreak' ? 'selected' : ''
            }  ${
              color === 'red' && selected === 'shortBreak'
                ? 'selectedRed'
                : color === 'blue' && selected === 'shortBreak'
                ? 'selectedBlue'
                : color === 'purple' && selected === 'shortBreak'
                ? 'selectedPurple'
                : ''
            } `}
            id='short-break'
            onClick={handleTimeClicks}
          >
            Short Break
          </div>
          <div
            className={`${'buttons'} ${
              selected === 'longBreak' ? 'selected' : ''
            }  ${
              color === 'red' && selected === 'longBreak'
                ? 'selectedRed'
                : color === 'blue' && selected === 'longBreak'
                ? 'selectedBlue'
                : color === 'purple' && selected === 'longBreak'
                ? 'selectedPurple'
                : ''
            } `}
            id='long-break'
            onClick={handleTimeClicks}
          >
            Long Break
          </div>
        </div>

        <svg viewBox='0 0 10 10' className='svg' >
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
            className={`${'circle'}  ${color === 'red' ? 'redCircle': color === 'blue'? 'blueCircle': 'purpleCircle'} `}
            cx='5'
            cy='5'
            r='3.3'
            key={indicator}
            fill='none'
            strokeWidth='0.3'
            style={{
              strokeDasharray: `${20.73}`,
              strokeDashoffset:`${offset}`,
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
            id={`${startCountdown && action === 'PAUSE' ? 'stop' : !startCountdown && action === 'START' ? 'start': 'done' }`}
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
          className='Modal'
          overlayClassName='Overlay'
          contentLabel='Settings Modal'
        >
          <div className={font}>
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
                className={`${'roboto fonts'} ${
                  fontSetting === 'roboto' ? 'selectedFont' : ''
                } `}
                id='roboto'
                onClick={handleFontClick}
              >
                Aa
              </div>
              <div
                className={`${'xanhMono fonts'} ${
                  fontSetting === 'xanhMono' ? 'selectedFont' : ''
                } `}
                id='xanhMono'
                onClick={handleFontClick}
              >
                Aa
              </div>
              <div
                className={`{${'lato fonts'} ${
                  fontSetting === 'lato' ? 'selectedFont' : ''
                } `}
                id='lato'
                onClick={handleFontClick}
              >
                Aa
              </div>
            </div>
            <div className='configureColor'>
              <h4 className='header fontColor '>COLOR</h4>
              <div
                className={`${'color colorRed'} ${
                  colorSetting === 'red' ? 'checked' : ''
                } `}
                id='red'
                onClick={handleColorClick}
              ></div>
              <div
                className={`${'color colorBlue'} ${
                  colorSetting === 'blue' ? 'checked' : ''
                } `}
                id='blue'
                onClick={handleColorClick}
              ></div>
              <div
                className={`${'color colorPurple'} ${
                  colorSetting === 'purple' ? 'checked' : ''
                } `}
                id='purple'
                onClick={handleColorClick}
              ></div>
            </div>
            <div
              className={`${'applyButton'} ${
                colorSetting === 'red'
                  ? 'applyRed'
                  : colorSetting === 'blue'
                  ? 'applyBlue'
                  : 'applyPurple'
              } `}
              onClick={handleApplySettings}
            >
              Apply
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}