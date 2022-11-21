import React, { useState, useEffect } from 'react';
import { audioList } from './audioList';
import { Container, Grid, Select, FormControl, MenuItem } from '@mui/material';

const Meditation = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [musicChoice, setMusicChoice] = useState(0);

  const formatTime = (time) => {
    if (!time) return '00:00';
    time = time / 1000;
    let seconds = Math.floor(time % 60);
    let secondString = seconds < 10 ? '0' + seconds : seconds;
    time = Math.floor(time / 60);
    let minutes = time % 60;
    return `0${minutes}:${secondString}`;
  };

  const selectOptions = audioList.map((song, index) => {
    return (
      <MenuItem key={song.title} value={index}>
        {song.title}
      </MenuItem>
    );
  });

  const formChange = (event) => {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
    setMusicChoice(event.target.value);
    if (isPlaying) {
      setTimeout(() => audio.play(), 100);
    }
  };

  const startMeditation = () => {
    setElapsedTime(null);
    document.getElementById('audio').play();
    setPlaying(true);
    setStartTime(new Date());
  };

  const stopMeditation = () => {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime.getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <Container>
      <div className="centered">
        <h1>Minutes of Mindfulness</h1>
        <p>Pause. Be still and fully present.</p>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} align="center">
          <div>
            <br />
            <img
              src="https://www.verywellhealth.com/thmb/_9iR1LWivMoArUVcXtGKWNVcWgg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1194155288-63c50e4a917848bd863083e014df757c.jpg"
              width="750px"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={5} align="center">
          <div id="player">
            <div className="timer">{formatTime(elapsedTime)}</div>
            <div className="buttons">
              <img
                id="player-button"
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
              <FormControl sx={{ minWidth: 220 }} size={'small'}>
                <Select
                  id="musicChoice"
                  value={musicChoice}
                  onChange={formChange}
                  name="musicChoice"
                >
                  {selectOptions}
                </Select>
              </FormControl>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Meditation;
