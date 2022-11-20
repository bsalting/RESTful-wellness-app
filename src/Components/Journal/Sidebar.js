import React from 'react';

function Sidebar(props) {
  const entryElements = props.entries.map((entry) => {
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
      <h3>Journal Entries</h3>
      <div
        className={
          props.selectedEntry ? 'sidebar-entry' : 'sidebar-entry selected-entry'
        }
        onClick={() => props.setSelectedEntry(null)}
      >
        New journal entry
      </div>
      {entryElements}
    </section>
  );
}

export default Sidebar;
