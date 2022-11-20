import React, { useState, useEffect } from 'react';
import { audioList } from './audioList';

const Meditation = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [musicChoice, setMusicChoice] = useState(0);

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

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime.getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div>
      <div className="centered">
        <h1>Minutes of Mindfulness</h1>
        <p>Pause. Be still and fully present.</p>
      </div>
      <div>
        <img src="https://www.verywellhealth.com/thmb/_9iR1LWivMoArUVcXtGKWNVcWgg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1194155288-63c50e4a917848bd863083e014df757c.jpg" />
      </div>
      <div>
        <div className="timer">{formatTime(elapsedTime)}</div>
        <div className="buttons">
          <img
            src="/static/play-button.svg"
            height="105px"
            alt="Play"
            onClick={startMeditation}
            className={isPlaying ? 'disabled' : 'enabled'}
          ></img>
          <img
            src="/static/stop-button.svg"
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
      </div>
    </div>
  );
};

export default Meditation;
