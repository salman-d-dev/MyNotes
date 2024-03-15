import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNotesForm from "./AddNotesForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ConfirmComp from "./ConfirmComp";
import NoResult from "./noresult/NoResult";
import useGetNotes from "../hooks/useGetNotes";

const Notes = (props) => {
  const NavigateTo = useNavigate();
  const NoteContext = useContext(noteContext);
  const {
    // notes,
    fetchAllNotes,
    editNote,
    deleteNote,
    searchTriggered,
    filteredNotes,
  } = NoteContext;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      NavigateTo("/signin");
    }
  }, []);


  ///
  const [pageNum, setPageNum] = useState(1);

  const { loading, error, notes, hasMore } = useGetNotes(pageNum);

  const intObserver = useRef();
  const lastNoteRef = useCallback(
    (node) => {
      if (loading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevNum) => prevNum + 1);
        }
      });

      if (node) {
        intObserver.current.observe(node);
      }
    },
    [loading, hasMore]
  );
  
  // If server issue, show error
  if(Object.keys(error).length > 0){
    return (
        <h1>Error bruh</h1>
    )
  }
  ///


  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    // Check if title and description meet the minimum length requirement
    if (note.title.length < 2) {
      setTitleError(true);
      return;
    }

    if (note.description.length < 5) {
      setDescriptionError(true);
      return;
    }

    await editNote(note.id, note.title, note.description, note.tag);
    handleClose();
    props.showAlert("Note Updated Successfully", "success");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSaveEdit(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit(e);
    }
  };

  

  const changeNote = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });

    // Reset the error states
    if (name === "title") {
      setTitleError(false);
    }

    if (name === "description") {
      setDescriptionError(false);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAddNote, setShowAddNote] = useState(false);

  //for showing confirm comp
  //select note for deletion
  const [selectedNoteforDeletion,setSelectedNoteForDeletion] = useState('')
const [showConfirmDel, setShowConfirmDel] = useState(false);

const handleYesDeleteReq = () =>{
  deleteNote(selectedNoteforDeletion);
  props.showAlert('Note Deleted Successfully', 'success');
  setShowConfirmDel(false)
};
// useEffect(()=>{
//   const handleEscOnConf = (event) =>{
//     if(event.keyCode === 27 && showConfirmDel ){
//       setShowConfirmDel(false)
//     }
//   }
//   document.addEventListener('keydown', handleEscOnConf);
//   return () => {
//     document.removeEventListener('keydown', handleEscOnConf);
//   };
// }
// ,[showConfirmDel]);

// useEffect(

//   ()=>{
//     const handleEntOnConf = (event) =>{
//       if(event.key === "Enter" && showConfirmDel ){
//         handleYesDeleteReq();
//       }
//     };
//     document.addEventListener('keydown', handleEntOnConf);
//     return () => {
//       document.removeEventListener('keydown', handleEntOnConf);
//     };
//   }
// ,[showConfirmDel,selectedNoteforDeletion,deleteNote]);

  return (
    <>

      <button onClick={() => {setShowAddNote(!showAddNote);}} className="addNoteButton" id="add">
        {showAddNote ? "Close Form" : "Add Note"}
      </button>

      {showAddNote ? <AddNotesForm setShowAddNote={setShowAddNote} showAlert={props.showAlert} /> : ""}

      {/* For confirm Comp */}
      {showConfirmDel && <ConfirmComp onYesClick={handleYesDeleteReq} onNoClick={()=>{
        setShowConfirmDel(false)
      }} />}

      <Button
        variant="primary"
        onClick={handleShow}
        className="d-none"
        ref={ref}
      >
        Launch button
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="my-3" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="eLabel">Title</Form.Label>
              <Form.Control
                type="text"
                className={`editControl ${titleError ? "is-invalid" : ""}`}
                placeholder="Enter title"
                id="etitle"
                name="title"
                onChange={changeNote}
                value={note.title}
                onKeyPress={handleKeyPress}
              />
              {titleError && (
                <Form.Text className="text-danger">
                  Title must be at least 2 characters long.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="eLabel">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className={`editControl ${
                  descriptionError ? "is-invalid" : ""
                }`}
                placeholder="Enter description"
                id="edescription"
                name="description"
                onChange={changeNote}
                value={note.description}
              />
              {descriptionError && (
                <Form.Text className="text-danger">
                  Description must be at least 5 characters long.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="eLabel">Tag</Form.Label>
              <Form.Control
                type="text"
                className="editControl"
                placeholder="Any tag?"
                id="etag"
                name="tag"
                onChange={changeNote}
                value={note.tag}
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveEdit}
            className="addNoteButton"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row my-5 mx-1">
        <h1 className="text-center">Your Notes</h1>

        { notes.length === 0 && (<div className="emptyNotes">
          <h3>(No notes to display)</h3>
        </div>)}

      </div>
      <div className="row notesBox">
  {/* Display filtered notes if search is triggered, otherwise display all notes */}
  {notes.map((note, index) => {
    if (notes.length === index + 1) {
      return (
        <NoteItem
          key={note._id}
          note={note}
          updateNote={updateNote}
          showAlert={props.showAlert}
          onClickDelete={() => {
            setShowConfirmDel(true);
            setSelectedNoteForDeletion(note._id);
          }}
          ref={lastNoteRef} // Here, assign the ref to the last note
        />
      );
    }

    return (
      <NoteItem
        key={note._id}
        note={note}
        updateNote={updateNote}
        showAlert={props.showAlert}
        onClickDelete={() => {
          setShowConfirmDel(true);
          setSelectedNoteForDeletion(note._id);
        }}
      />
    );
  })}
  {loading && <h2>Loading...................................</h2>}
</div>

      <button className="btn btn-primary d-none" ref={refClose}>
        Save
      </button>
    </>
  );
};

export default Notes;


import React, { useState, useEffect, forwardRef } from "react";
import Card from "react-bootstrap/Card";
// import noteContext from '../context/notes/noteContext';
import noteicon from "./static/noteicon.png";
import deleteIcon from "./static/deleteIcon.svg";
import editIcon from "./static/editIcon.svg";
import { formatTime } from "../utils/helpers";

const NoteItem = forwardRef((props, ref) => {
  const { note, updateNote, onClickDelete, searched } = props;

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
          onClick={() => {
            // updateNote(note);
          }}
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
          // onClick={onClickDelete}
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

