import React, { useState } from "react";

export default function InputNote (props) {

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  function handleTitleChange (e) {
    let title = e.target.value;
    setNoteTitle(title);
  }

  function handleBodyChange (e) {
    let body = e.target.value;
    setNoteBody(body);
  }

  function handleClick () {
    props.addNote(noteTitle, noteBody);
    setNoteTitle("");
    setNoteBody("");
  }

  return  (
    <article className="note-container input-note-container">
      <input type = "text" placeholder = "Note's title" onChange = {handleTitleChange} value = {noteTitle}/>
      <textarea placeholder="Note's content" onChange = {handleBodyChange} value = {noteBody}></textarea>
      <button type = "button" onClick = {handleClick}>+</button>
    </article>
  );
}
