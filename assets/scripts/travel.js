function travelNotes() {
  "use strict";

  // get a reference to .note_output in the DOM
  // n.b. these can be combined as well
  let noteOutput = document.querySelector('.note-output');

  let addNoteBtn = document.getElementById('add-note');

  let inputNote = document.getElementById('note-input');

  addNoteBtn.addEventListener('click', () => {
    // create p node
    let p = document.createElement('p');
    // get value from input field for note
    let inputVal = inputNote.value;
    // create text node
    let nodeText = document.createTextNode(inputVal);

    if (inputVal != '') {
      let noteText =document.createTextNode(inputVal)
      p.appendChild(nodeText);
      // append new paragraph and text to existing note output
      noteOutput.appendChild(p);
      inputNote.value='';
    }
  });

}

// load app
travelNotes();