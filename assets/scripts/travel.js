function travelNotes() {
  "use strict";

  // get a reference to .note_output in the DOM
  // n.b. these can be combined as well
  let noteOutput = document.querySelector('.note-output');

  let addNoteBtn = document.getElementById('add-note');

  let inputNote = document.getElementById('note-input');

  let controls = document.getElementById('controls');

  // delete all notes button
  let deleteAll = document.getElementById('notes-delete');

  addNoteBtn.addEventListener('click', () => {
    createNote(inputNote, noteOutput);
  });

  inputNote.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
      createNote(inputNote, noteOutput);
      // check key pressed by code - 13 - return
      console.log('return key pressed...');
    }
  });

  deleteAll.addEventListener('click', () => {
    // get notes from DOM
    let notes = noteOutput.querySelectorAll('p');
    // loop through notes and remove a single note per iteration...
    for (let note of notes) {
      note.remove();
    }
  });
}


function createNote(input, output) {
  // create p node
  let p = document.createElement('p');
  // create a class for the items
  p.classList.add('note-item');
  // get value from input field for note
  let inputVal = input.value;
  // check input value
  if (inputVal !== '') {
    // create text node
    let noteText = document.createTextNode(inputVal);
    // append text to paragraph
    p.appendChild(noteText);
    // append new paragraph and text to existing note output
    output.appendChild(p);
    // clear input text field
    input.value = '';
  }
}

/* check visibility of passed node
function checkVisible(node) {
  // check passed node's current visibility
  if (node.style.display != 'block') {
    // show in DOM to allow fadeIn...
    node.style.display = 'block';
    // call fadeIn for node in DOM
    fadeIn(node);
  }
} */

// load app
travelNotes();