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
    axios.post('http://localhost:3003/todos', { title: noteTitle, description: noteBody })
      .then((data) => {
        const oneNotes = data.data;
        setNotes(prev => [...prev, { title: oneNotes.title, description: oneNotes.description, _id: oneNotes._id }]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:3003/todos/${id}`)
      .then(() => {
        setNotes(prev => prev.filter((note, ind) => id !== note._id))
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <Header />
      <main>
        <InputNote addNote={addNote} />
      </main>
      <main>
        {notes.map((note) => <Note key={note._id} id={note._id} title={note.title} description={note.description} delNote={deleteNote} />)}
      </main>
      <Footer />
    </div>
  );
}

export default App;