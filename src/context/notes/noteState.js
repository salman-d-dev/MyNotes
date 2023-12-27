// THIS IS WHAT CONNECTS THE BACKENED API TO FRONT END, WE USE 'fetch api'
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
const host = process.env.REACT_APP_BACKEND_HOST;



  const [notes, setNotes] = useState([]);

  //FUNC TO FETCH ALL NOTES

  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const jsonNotes = await response.json();
    setNotes(jsonNotes);
  };

  //FUNC TO ADD A NOTE
  //Add func from addnotesform into here and use it there

  const addNote = async (title, description, tag) => {
    // api call for backened add  note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newnote = await response.json();

    //set the note
    setNotes(notes.concat(newnote));
  };

  //FUNC TO EDIT NOTES

  const editNote = async (id, title, description, tag) => {
    // api call for backened edit
    // back end edit
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //edit in client end 
    let copiedNotesArray = JSON.parse(JSON.stringify(notes));
    for(let i = 0; i < copiedNotesArray.length; i++) {
      if (copiedNotesArray[i]._id === id) {
        copiedNotesArray[i].title = title;
        copiedNotesArray[i].description = description;
        copiedNotesArray[i].tag = tag;
        break;
      }
    }
    setNotes(copiedNotesArray);
  };

  //DELETE A NOTE

  const deleteNote = async (id) => {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    //client side edit (server side is done by backend app)
    const notes_after_del = notes.filter((currentNote) => {
      return currentNote._id !== id; //filter all notes so that the current id note is not in the list
    });
    setNotes(notes_after_del);
  };
  
  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchAllNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
