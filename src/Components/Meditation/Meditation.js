import React from 'react';
import { audioList } from './audioList';

const Meditation = () => {
  const [startTime, setStartTime] = React.useState(null);
  const [elapsedTime, setElapsedTime] = React.useState(null);
  const [isPlaying, setPlaying] = React.useState(false);
  const [musicChoice, setMusicChoice] = React.useState(0);

  function formatTime(time) {
    if (!time) return '00:00';
    time = time / 1000;
    let seconds = Math.floor(time % 60);
    let secondString = seconds < 10 ? '0' + seconds : seconds;
    time = Math.floor(time / 60);
    let minutes = time % 60;
    return `0${minutes}:${secondString}`;
  }

  const selectOptions = audioList.map((song, index) => {
    return (
      <option key={song.title} value={index}>
        {song.title}{' '}
      </option>
    );
  });

  function formChange(event) {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
    setMusicChoice(event.target.value);
    if (isPlaying) {
      setTimeout(() => audio.play(), 100);
    }
  }

  function startMeditation() {
    setElapsedTime(null);
    document.getElementById('audio').play();
    setPlaying(true);
    setStartTime(new Date());
  }

  function stopMeditation() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  }

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime.getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <>
      <div className="centered">
        <h1>Meditation Timer</h1>
        <p>Some text goes here</p>
      </div>
      <div className="timer">{formatTime(elapsedTime)}</div>
      <div className="buttons">
        <img
          src="https://www.freeiconspng.com/uploads/play-button-icon-png-17.png"
          height="105px"
          alt="Play"
          onClick={startMeditation}
          className={isPlaying ? 'disabled' : 'enabled'}
        ></img>
        <img
          src="https://cdn4.iconfinder.com/data/icons/multimedia-35/52/stop-button-512.png"
          height="100px"
          alt="Stop"
          onClick={stopMeditation}
          className={isPlaying ? 'enabled' : 'disabled'}
        ></img>

        <audio loop id="audio" src={audioList[musicChoice].file}></audio>
      </div>

      <div className="buttons">
        <select
          id="musicChoice"
          value={musicChoice}
          onChange={formChange}
          name="musicChoice"
        >
          {selectOptions}
        </select>
      </div>
    </>
  );
};

export default Meditation;
