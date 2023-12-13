import React from "react";

function Note(props) {

  function handleClick() {
    console.log(props)
    props.delNote(props.id);
  }

  return (
    <article className="note-container input-note-container static-note-container">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button onClick={handleClick}>-</button>
    </article>
  );
}

export default Note;