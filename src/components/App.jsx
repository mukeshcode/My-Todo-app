import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";
import InputNote from "./InputNote";


function App(){

  const [notes, setNotes] = useState([])

  function addNote (noteTitle, noteBody) {
    setNotes(prev => [...prev, {title : noteTitle, content : noteBody }] ); 
  }

  function deleteNote(index) {
    setNotes(prev => prev.filter((note, ind) => { return index !== ind; }))
  }

  return (
    <div>
      <Header />
      <main>
        <InputNote addNote = {addNote} />
      </main>
      <main>
        {notes.map((note,index) => <Note key = {index} id = {index} title = {note.title} content = {note.content} delNote={deleteNote} />)} 
      </main>
      <Footer />
    </div>
  );
}

export default App;