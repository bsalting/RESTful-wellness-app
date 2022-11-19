import React from 'react';
import playButton from '../../assets/play-button.svg';
import stopButton from '../../assets/stop-button.svg';
import { audioList } from './audioList';

const Meditation = () => {
  const [startTime, setStartTime] = React.useState(null);
  const [elapsedTime, setElapsedTime] = React.useState(null);
  const [isPlaying, setPlaying] = React.useState(false);

  const [musicChoice, setMusicChoice] = React.useState(0);

  function formatTime(time) {
    if (!time) return '0:00';
    time = time / 1000;
    let seconds = Math.floor(time % 60);
    let secondString = seconds < 10 ? '0' + seconds : seconds;
    time = Math.floor(time / 60);
    let minutes = time % 60;
    return `${minutes}:${secondString}`;
  }

  // select dropdown options
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
      /* play() returns a promise, using setTimeout to prevent this exception
            "Uncaught (in promise) DOMException: The play() request was interrupted by a new load request" */
      setTimeout(() => audio.play(), 100);
    }
  }

  function startMeditation() {
    // clear elapsed time first so display immediately shows 0:00
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
          src={playButton}
          alt="play meditation button"
          onClick={startMeditation}
          className={isPlaying ? 'disabled' : 'enabled'}
        ></img>
        <img
          src={stopButton}
          alt="stop meditation button"
          onClick={stopMeditation}
          className={isPlaying ? 'enabled' : 'disabled'}
        ></img>

        {/* music loops back to beginning at end of mp3 */}
        <audio loop id="audio" src={audioList[musicChoice].file}></audio>
      </div>

      {/* music choice form */}
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
