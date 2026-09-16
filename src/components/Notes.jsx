
import { useEffect, useState } from "react";

function Notes() {
  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    return JSON.parse(savedNotes);
  }

  return [
    {
      id: 1,
      title: "Data Structures",
      content: "Revise trees, graphs and sorting algorithms."
    },
    {
      id: 2,
      title: "Java",
      content: "Practice inheritance, interfaces and abstraction."
    }
  ];
});
      useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
      }, [notes]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addNote() {
    if (title.trim() === "" || content.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
  }

  function deleteNote(id) {
    setNotes(
      notes.filter((note) => note.id !== id)
    );
  }

  return (
    <div className="notes-page">

      <h1>Notes</h1>

      <p className="page-description">
        Create and manage your study notes
      </p>

      <div className="notes-form">

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button onClick={addNote}>
          Add Note
        </button>

      </div>

      <div className="notes-list">

        {notes.map((note) => (

          <div className="note-card" key={note.id}>

            <div>
              <h2>{note.title}</h2>

              <p>
                {note.content}
              </p>
            </div>

            <button
              className="delete-note"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notes;

