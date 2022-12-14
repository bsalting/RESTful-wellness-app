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
      <div id="sidebar-header">
        <h3>All Journal Entries</h3>
      </div>
      <div
        id="create-entry"
        className={
          props.selectedEntry ? 'sidebar-entry' : 'sidebar-entry selected-entry'
        }
        onClick={() => props.setSelectedEntry(null)}
      >
        CREATE ENTRY
      </div>
      {entryElements}
    </section>
  );
}

export default Sidebar;
