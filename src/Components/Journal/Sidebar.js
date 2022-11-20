import React from 'react';

function Sidebar(props) {
  const entryElements = props.entries.map((entry) => {
    // "selected entry" state is maintained in the parent
    return (
      <div
        className={
          props.selectedEntry == entry.id
            ? 'sidebar-entry selected-entry'
            : 'sidebar-entry'
        }
        key={entry.id}
        onClick={() => props.setSelectedEntry(entry.id)}
      >
        {entry.question}
      </div>
    );
  });
  return (
    <section className="sidebar">
      <h3>All Journal Entries</h3>
      <div
        className={
          props.selectedEntry ? 'sidebar-entry' : 'sidebar-entry selected-entry'
        }
        onClick={() => props.setSelectedEntry(null)}
      >
        Create an entry
      </div>
      {entryElements}
    </section>
  );
}

export default Sidebar;
