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
        <h3>Past Entry</h3>
        <section className="past-entry">
          <p className="strong">
            <b>
              {new Date(props.entryDetails.date).toLocaleDateString(
                'en-US',
                options
              )}
            </b>
          </p>
          <p>{props.entryDetails.question}</p>
          <div id="past-entry-text">
            <p> {props.entryDetails.answer}</p>
          </div>
          <div id="past-entry-emotion">
            <p>
              {' '}
              Emotion detected:{' '}
              {props.entryDetails.emotion.toString().replace(/"/g, '')}
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default PastEntry;
