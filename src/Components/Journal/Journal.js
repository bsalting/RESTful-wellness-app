import React, { useState, useEffect } from 'react';
import { getQuestion } from './gratitudeFetch';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import PastEntry from './PastEntry';

const Journal = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // past entries from LocalStorage. use lazy state initialization
  const [pastEntries, setPastEntries] = useState(
    () => JSON.parse(localStorage.getItem('journalEntries')) || []
  );

  // past entry optionally selected in sidebar
  const [selectedEntry, setSelectedEntry] = useState(null);

  // load a new question and save entries array to localStorage when new entry is saved
  useEffect(() => {
    // update the localStorage copy of entries array
    localStorage.setItem('journalEntries', JSON.stringify(pastEntries));

    // need an IIFE to fetch new question because useEffect can't be async
    (async () => {
      const data = await getQuestion();
      setQuestion(data.question ? data.question : 'Error loading question');
    })();
  }, [pastEntries]);

  // handle journal input change
  function handleChange(event) {
    setAnswer(event.target.value);
  }

  function handleSubmit() {
    const newEntry = {
      id: nanoid(),
      date: new Date(),
      question: question,
      answer: answer,
    };
    setPastEntries([newEntry, ...pastEntries]);
    document.getElementById('answer').value = '';
  }

  function handleCancel() {
    document.getElementById('answer').value = '';
  }

  function getPastEntryData(id) {
    return pastEntries.find((entry) => entry.id === id);
  }

  return (
    <div className="wrapper">
      <div>
        <h3>Deliberate Instrospection</h3>
        <p>Unlock the many benefits of journaling</p>
      </div>
      {pastEntries.length > 0 && (
        <Sidebar
          entries={pastEntries}
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      )}

      {selectedEntry ? (
        <PastEntry entryDetails={getPastEntryData(selectedEntry)} />
      ) : (
        <section className="centered">
          <h1>New entry</h1>
          <div>
            <p>
              Take a moment to reflect and write about the following question:{' '}
            </p>
            <p className="strong">
              {question ? question : 'Question loading...'}
            </p>
            <textarea
              onChange={handleChange}
              id="answer"
              name="answer"
            ></textarea>
            <div className="buttons">
              <button onClick={handleCancel} id="cancel-button">
                Cancel
              </button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </section>
      )}
      <div>
        <img src="/static/journal.png" width="600"></img>
      </div>
    </div>
  );
};

export default Journal;
