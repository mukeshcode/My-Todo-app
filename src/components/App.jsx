import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import InputNote from "./InputNote";

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/todos')
      .then(data => {
        setNotes(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[])

  function addNote(noteTitle, noteBody) {
    setNotes(prev => [...prev, { title: noteTitle, description: noteBody }]);
  }

  function deleteNote(index) {
    setNotes(prev => prev.filter((note, ind) => { return index !== ind; }))
  }

  return (
    <div>
      <Header />
      <main>
        <InputNote addNote={addNote} />
      </main>
      <main>
        {notes.map((note, index) => <Note key={index} id={index} title={note.title} description={note.description} delNote={deleteNote} />)}
      </main>
      <Footer />
    </div>
  );
}

export default App;