import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNotesForm from "./AddNotesForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ConfirmComp from "./ConfirmComp";


const Notes = (props) => {
  const NavigateTo = useNavigate();
  const NoteContext = useContext(noteContext);
  const { notes, fetchAllNotes, editNote, deleteNote } = NoteContext;


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      NavigateTo("/signin");
    } else {
      fetchAllNotes();
    }
  }, []);

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
useEffect(()=>{
  const handleEscOnConf = (event) =>{
    if(event.keyCode === 27 && showConfirmDel ){
      setShowConfirmDel(false)
    }
  }
  document.addEventListener('keydown', handleEscOnConf);
  return () => {
    document.removeEventListener('keydown', handleEscOnConf);
  };
}
,[showConfirmDel]);

useEffect(

  ()=>{
    const handleEntOnConf = (event) =>{
      if(event.key === "Enter" && showConfirmDel ){
        handleYesDeleteReq();
      }
    };
    document.addEventListener('keydown', handleEntOnConf);
    return () => {
      document.removeEventListener('keydown', handleEntOnConf);
    };
  }
,[showConfirmDel,selectedNoteforDeletion,deleteNote]);

//for search func:
const [searchedNotes,setSearchedNotes] = useState([]);
const [searchKeyword,setSearchKeyword] = useState('');
const [searchOptionTriggered, setSearchOptionTriggered] = useState(false)


  
  const handleSearchFieldDataChange = (e)=>{
    setSearchKeyword(e.target.value)
    setSearchOptionTriggered(e.target.value.length > 0);
    
    // Filter the notes based on search keywords
    const filteredNotes = notes.filter(
      (note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      note.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      note.tag.some((tag) =>
      tag.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      );
      setSearchedNotes(filteredNotes);
  }

  useEffect(() => {
    // Filter the notes based on search keywords
    const filteredNotes = notes.filter((note) => {
      const trimmedKeyword = searchKeyword.trim().toLowerCase();
      const titleMatch = note.title.toLowerCase().includes(trimmedKeyword);
      const descriptionMatch = note.description.toLowerCase().includes(trimmedKeyword);
      const tagMatch = note.tag.toLowerCase().includes(trimmedKeyword);
      const dateMatch = note.date.toLowerCase().includes(trimmedKeyword);
    
      return titleMatch || descriptionMatch || tagMatch || dateMatch;
    });
  
    setSearchedNotes(filteredNotes);
  }, [searchKeyword, notes]);

//   In the given code, there are two instances where the notes are filtered based on search keywords. The first instance is inside the handleSearchFieldDataChange function, which is triggered on the onChange event of the search input field. The second instance is inside the useEffect hook at the bottom of the code.

// The reason for having two separate filtering implementations is to handle different scenarios efficiently:

// handleSearchFieldDataChange: This function is responsible for filtering the notes as the user types in the search input field. It is triggered on every change in the input value and updates the searchedNotes state immediately, providing real-time search results to the user. This approach ensures a responsive and interactive search experience.

// useEffect hook at the bottom: This hook is responsible for filtering the notes whenever the searchKeyword or notes state changes. It provides a fallback mechanism to update the searchedNotes state if there are any changes to the searchKeyword or notes array outside of the search input field. This ensures that the search results remain up to date even if the user navigates away from the search input field or performs other actions that may affect the notes.

  return (
    <>

      <div className="sudoNavbar">
        <div>
          <button
            onClick={() => {
              setShowAddNote(!showAddNote);
            }}
            className="addNoteButton"
          >
            {showAddNote ? "Close Form" : "Add Note"}
          </button>
        </div>


        <div className="searchBar">
          <input type="text" className="searchInput" placeholder="Search..." onChange={handleSearchFieldDataChange}/>
          <button className="addNoteButton">Search</button>
        </div>
      </div>

      {showAddNote ? <AddNotesForm showAlert={props.showAlert} /> : ""}

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

        {searchedNotes.length ===0 && notes.length!==0 && (<div className="emptySearchResult">
          <h3>(No search results..)</h3>
        </div>)}

        { notes.length === 0 && (<div className="emptyNotes">
          <h3>(No notes to display)</h3>
        </div>)}

        {searchOptionTriggered && searchedNotes.length>0? (<div>
          <h3 className="text-center">({searchedNotes.length} {searchedNotes.length === 1? "result": "results"} found)</h3>
        </div>) : (null)}
      </div>
      <div className="row">
        {/* if filtered notes is not empty */}
        { (searchOptionTriggered && searchKeyword.length>0)? searchedNotes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert} onClickDelete={()=>{
                setShowConfirmDel(true);
                setSelectedNoteForDeletion(note._id);
              }}
              searched={true}
            />
          );
        }) : notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert} onClickDelete={()=>{
                setShowConfirmDel(true);
                setSelectedNoteForDeletion(note._id);
              }}
            />
          );
        }) }
      </div>
      <button className="btn btn-primary d-none" ref={refClose}>
        Save
      </button>
    </>
  );
};

export default Notes;
