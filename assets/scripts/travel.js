function travelNotes() {
  "use strict";

  // get a reference to .note_output in the DOM
  // n.b. these can be combined as well
  let noteOutput = document.querySelector('.note-output');
  noteOutput.innerHTML = '<p>My first travel note for Berlin!<p>';

  let addNoteBtn = document.getElementById('add-note');
  addNoteBtn.addEventListener('click', () => {
    console.log('Add button clicked.')
  })

}

// load app
travelNotes();