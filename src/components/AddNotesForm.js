import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AiOutlineCloseSquare } from "react-icons/ai";
import { addNote } from '../api/notes';
import { useNoteContext } from '../context/notes/noteContext';


const AddNotesForm = (props) => {
  const [note, setNote] = useState({ title: '', description: '', tag: '', date: new Date() });

  const {setShowAddForm, setNotes} = useNoteContext()
  const handleAddNote = async (e) => {
    e.preventDefault();
  
    // Create a copy of the current note
    const newNote = { ...note };
  
    try {
      // Add note backend
      const success = await addNote(newNote.title, newNote.description, newNote.tag);
  
      // If successful, update the date field of the new note to the current time,
      // add note client, and reset note state with empty values
      if (success) {
        newNote.date = new Date();
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert('Note added successfully', 'success');
      }
    } catch (error) {
      console.error("Error adding note:", error);
      props.showAlert("Something went wrong", "danger");
    }
  }
  

  const changeNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-5 addNotesForm">
        <AiOutlineCloseSquare className="closeButton" onClick={()=>{setShowAddForm(false)}} />
      <h3 className="text-center mb-4">Add a Note</h3>
      <Form onSubmit={handleAddNote}>
        <Form.Group controlId="formTitle" className="text-center mx-auto">
          <Form.Label>Title</Form.Label>
          <Form.Control 
          className='tagField'
            type="text"
            placeholder="Enter title"
            onChange={changeNote}
            name="title"
            minLength={2}
            value={note.title}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="text-center mx-auto my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
          className='tagField'
            as="textarea"
            rows={3}
            placeholder="Enter description"
            onChange={changeNote}
            name="description"
            minLength={5}
            value={note.description}
            required
            
          />
        </Form.Group>

        <Form.Group controlId="formTag" className="text-center mx-auto">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            className='actualtagField'
            type="text"
            placeholder="Any tag?"
            onChange={changeNote}
            name="tag"
            value={note.tag}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="mt-3 addNoteButton"
            disabled={note.title.length < 2 || note.description.length < 5}
          >
            Add Note
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNotesForm;
