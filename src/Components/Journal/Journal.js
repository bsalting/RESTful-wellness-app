import React from 'react';
//import { getQuestion } from './gratitudeFetch';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import PastEntry from './PastEntry';

const Journal = () => {
  // current question and textarea answer
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  // past entries from LocalStorage. use lazy state initialization
  const [pastEntries, setPastEntries] = React.useState(
    () => JSON.parse(localStorage.getItem('journalEntries')) || []
  );

  // past entry optionally selected in sidebar
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  // load a new question and save entries array to localStorage when new entry is saved
  React.useEffect(() => {
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

  // save new entry to entries array with date and id
  function handleSubmit() {
    // create entry object with id, date, question, and answer
    const newEntry = {
      id: nanoid(),
      date: new Date(),
      question: question,
      answer: answer,
    };

    // add new entry to pastEntries
    setPastEntries([newEntry, ...pastEntries]);

    // clear the textarea and get a new question
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
          <h1>Deliberate Reflection</h1>
          <div>
            <img src="/static/journal.png" width="600"></img>
          </div>
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
        </section>
      )}
    </div>
  );
};

export default Journal;
