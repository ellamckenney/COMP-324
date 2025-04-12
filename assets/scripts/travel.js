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
    // target notes in flex layout
    let notes = document.querySelectorAll('#note-list .flex-item');
    for (let note of notes) {
      note.remove();
    }
  });  
}


function createNote(input, output) {
  // create div for flex layout
  let note = document.createElement('div');
  // flex-item styling
  note.classList.add('flex-item');
  // get input value
  let inputVal = input.value;
  if (inputVal !== '') {
    // set text directly
    note.textContent = inputVal;
    // append to flex output area
    let flexOutput = document.getElementById('note-list');
    flexOutput.appendChild(note);
    // clear the input
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