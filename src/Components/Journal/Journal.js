import React, { useState, useEffect } from 'react';
import { getQuestion } from './gratitudeFetch';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import PastEntry from './PastEntry';
import { Container, Box, Grid } from '@mui/material';
import axios from 'axios';

const Journal = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [pastEntries, setPastEntries] = useState(
    () => JSON.parse(localStorage.getItem('journalEntries')) || []
  );

  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(pastEntries));

    (async () => {
      const data = await getQuestion();
      setQuestion(data.question ? data.question : 'Fetching question...');
    })();
  }, [pastEntries]);

  function handleChange(event) {
    setAnswer(event.target.value);
  }

  const options = {
    method: 'GET',
    url: 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/',
    params: {
      text: answer,
    },
    headers: {
      'X-RapidAPI-Key': '4ea22d6f7fmsh7703c9431b9367dp14675cjsnb1f08b5e6743',
      'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com',
    },
  };

  function handleSubmit() {
    axios
      .request(options)
      .then(function (response) {
        const newEntry = {
          id: nanoid(),
          date: new Date(),
          question: question,
          answer: answer,
          emotion: JSON.stringify(response.data.emotions_detected),
        };
        setPastEntries([newEntry, ...pastEntries]);
        document.getElementById('answer').value = '';
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleCancel() {
    document.getElementById('answer').value = '';
  }

  function getPastEntryData(id) {
    return pastEntries.find((entry) => entry.id === id);
  }

  return (
    <Container>
      <Box>
        <div>
          <h2>Deliberate Instrospection</h2>
          <p>Unlock the many benefits of journaling</p>
          <div>
            <img src="/static/journal.png" width="1150"></img>
          </div>
        </div>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} align="center">
          <Sidebar
            entries={pastEntries}
            selectedEntry={selectedEntry}
            setSelectedEntry={setSelectedEntry}
          />
        </Grid>

        <Grid item xs={12} sm={8} align="center">
          {selectedEntry ? (
            <PastEntry entryDetails={getPastEntryData(selectedEntry)} />
          ) : (
            <section>
              <h3>New entry</h3>
              <div id="journal-text">
                <p>
                  Take your time reflecting and responding with vulnerability
                </p>
                <p className="strong">
                  {question ? question : 'Fetching question...'}
                </p>
                <textarea
                  onChange={handleChange}
                  id="answer"
                  name="answer"
                ></textarea>
                <div className="buttons">
                  <button
                    onClick={handleCancel}
                    id="cancel-button"
                    className={answer ? 'enabled' : 'disabled'}
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSubmit}
                    id="save-button"
                    className={answer ? 'enabled' : 'disabled'}
                  >
                    Save
                  </button>
                </div>
              </div>
            </section>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Journal;
