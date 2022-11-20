import React from 'react';
import { audioList } from './audioList';
// To do: SVG doesn't load despite webpack loader added.
// Use img url for now.

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
    <div>
      <div className="centered">
        <h1>Minutes of Mindfulness</h1>
        <p>Some text goes here</p>
      </div>
      <div>
        <img src="https://www.verywellhealth.com/thmb/_9iR1LWivMoArUVcXtGKWNVcWgg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1194155288-63c50e4a917848bd863083e014df757c.jpg"></img>
      </div>
      <div>
        <div className="timer">{formatTime(elapsedTime)}</div>
        <div className="buttons">
          <img
            // src="https://www.freeiconspng.com/uploads/play-button-icon-png-17.png"
            src="/static/play-button.svg"
            height="105px"
            alt="Play"
            onClick={startMeditation}
            className={isPlaying ? 'disabled' : 'enabled'}
          ></img>
          <img
            // src="https://cdn4.iconfinder.com/data/icons/multimedia-35/52/stop-button-512.png"
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
