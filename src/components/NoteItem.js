import React, { useState, useEffect, forwardRef } from "react";
import Card from "react-bootstrap/Card";
// import noteContext from '../context/notes/noteContext';
import noteicon from "./static/noteicon.png";
import deleteIcon from "./static/deleteIcon.svg";
import editIcon from "./static/editIcon.svg";
import { formatTime } from "../utils/helpers";
import { useNoteContext } from "../context/notes/noteContext";
import { deleteNote } from "../api/deleteNote";

const NoteItem = forwardRef((props, ref) => {
  const { note } = props;

  const {setSelectedNote, setEditMode, setNotes} = useNoteContext();

  const [expandNote, setExpandNote] = useState(false);

  // for delete icon hover message
  const [deleteIcoMessage, setDeleteIcoMessage] = useState("");
  const handleMouseOverDel = () => {
    setDeleteIcoMessage("Delete Note");
  };

  const handleMouseOutDel = () => {
    setDeleteIcoMessage("");
  };

  //for edit icon hover message
  const [editIcoMessage, setEditIcoMessage] = useState("");
  const handleMouseOverEdit = () => {
    setEditIcoMessage("Edit Note");
  };

  const handleMouseOutEdit = () => {
    setEditIcoMessage("");
  };

  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      setExpandNote(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleEditNote = async() =>{
    setSelectedNote(note)
    setEditMode(true)
  }

  const handleDelete = async() =>{
    //backend delete
    const success = await deleteNote(note._id);
    if(success){
      props.showAlert("Note deleted", 'success')

      // frontend delete
      setNotes((prevNotes) => prevNotes.filter((noteItem)=> noteItem._id !== note._id));
    } else {
      props.showAlert("Something went wrong", "danger")
    }
  }

  const body = (
    <Card
      className={"my-3 noteCard"}
    >
      <Card.Img variant="top" src={noteicon} id="noteicon" />
      <Card.Body className="pb-2">
        <Card.Title className="noteTitle">{note.title}</Card.Title>
        <Card.Text className={expandNote ? "noteExpanded" : "noteDescription"}>
          {!expandNote && note.description.length > 100 ? (
            <>
              {note.description.slice(0, 100)}
              <span style={{ color: "yellow", fontSize: "1.2rem" }}>
                {" "}
                .....
              </span>
              <span
                className="readMoreButton mt-2"
                onClick={() => setExpandNote(!expandNote)}
              >
                Read More
              </span>
            </>
          ) : (
            note.description
          )}
          {expandNote && note.description.length > 100 && (
            <>
              <span
                className="readMoreButton mt-2"
                onClick={() => setExpandNote(!expandNote)}
              >
                Close
              </span>
            </>
          )}
        </Card.Text>
        <Card.Subtitle className="my-3 noteTag">{note.tag}</Card.Subtitle>

        <div className="noteDate">{formatTime(note.date)}</div>

        <img
          src={editIcon}
          alt="Edit Icon"
          className="editIconSvg"
          onClick={handleEditNote}
          onMouseOver={handleMouseOverEdit}
          onMouseOut={handleMouseOutEdit}
        />
        {editIcoMessage && (
          <div className="editIconMessage">{editIcoMessage}</div>
        )}

        <img
          src={deleteIcon}
          alt="Delete Icon"
          className="deleteIconSvg"
          onClick={handleDelete}
          onMouseOver={handleMouseOverDel}
          onMouseOut={handleMouseOutDel}
        />
        {deleteIcoMessage && (
          <div className="deleteIconMessage">{deleteIcoMessage}</div>
        )}
      </Card.Body>
    </Card>
  );

  const contentWithRef = ref ? (
    <article ref={ref}>{body}</article>
  ) : (
    <article>{body}</article>
  );

  return contentWithRef;
});

export default NoteItem;
