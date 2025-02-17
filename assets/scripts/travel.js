function travelNotes() {
  "use strict";

  // get a reference to .note_output in the DOM
  // n.b. these can be combined as well
  let noteOutput = document.querySelector('.note-output');

  let addNoteBtn = document.getElementById('add-note');

  let inputNote = document.getElementById('note-input');

  addNoteBtn.addEventListener('click', () => {
    createNote(inputNote, noteOutput);
  });

  inputNote.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
      createNote(inputNote, noteOutput);
    }
  });

}

function createNote(inputNote, noteOutput) {
  // create p node
  let p = document.createElement('p');
  // get value from input field for note
  let inputVal = inputNote.value;
  // check input value
  if (inputVal !== '') {
    // create text node
    let noteText = document.createTextNode(inputVal);
    // append text to paragraph
    p.appendChild(noteText);
    // append new paragraph and text to existing note output
    noteOutput.appendChild(p);
    // clear input text field
    inputNote.value = '';
  }
}

function checkVisible(node) {
  if(node.style.visibility = 'hidden') {
    // show in DOM to allow fadeIn
    node.style.display = 'block';
    node.style.visibility = 'visible';
    // call fade in for node DOM
    fadeIn(node);
  }
}

// load app
travelNotes();