import React from 'react';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const PastEntry = (props) => {
  return (
    <div>
      <section className="centered">
        <h1>Past Entry</h1>
        <section className="past-entry">
          <p className="strong">
            {new Date(props.entryDetails.date).toLocaleDateString(
              'en-US',
              options
            )}
          </p>
          <p>{props.entryDetails.question}</p>
          <p> {props.entryDetails.answer}</p>
        </section>
      </section>
    </div>
  );
};

export default PastEntry;
