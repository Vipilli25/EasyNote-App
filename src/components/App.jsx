import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("/api/notes")
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function addNote(note) {
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });

    axios.post("/api/notes", note)
      .then(response => {
        console.log("Note saved successfully:", response.data);
      })
      .catch(error => {
        console.error("Error saving post:", error);
      });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter(noteItem => noteItem._id !== id);
    });

    axios.delete(`/api/notes/${id}`)
    
      .then(() => {
        console.log("Note deleted successfully", id);
      })
      .catch(error => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;