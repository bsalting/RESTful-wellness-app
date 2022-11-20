import React from 'react';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

function PastEntry(props) {
  return (
    <section className="centered">
      <h1>Journal</h1>
      <section className="past-entry">
        <p className="strong">Date</p>
        {new Date(props.entryDetails.date).toLocaleDateString('en-US', options)}

        <p className="strong">Question</p>
        {props.entryDetails.question}

        <p className="strong">Answer</p>
        {props.entryDetails.answer}
      </section>
    </section>
  );
}

export default PastEntry;
