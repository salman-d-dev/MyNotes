import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import noteContext from '../context/notes/noteContext';

const AddNotesForm = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleAddNote = (e) => {
    props.showAlert('Note added successfully', 'success');
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ id: '', title: '', description: '', tag: '' });
  };

  const changeNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5 ">
      <h3 className="text-center mb-4">Add a Note</h3>
      <Form>
        <Form.Group controlId="formTitle" className="text-center w-50 mx-auto">
          <Form.Label>Title</Form.Label>
          <Form.Control 
          className='tagField'
            type="text"
            placeholder="Enter title"
            onChange={changeNote}
            id="title"
            name="title"
            minLength={2}
            value={note.title}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="text-center w-50 mx-auto my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
          className='tagField'
            as="textarea"
            rows={3}
            placeholder="Enter description"
            onChange={changeNote}
            id="description"
            name="description"
            minLength={5}
            value={note.description}
            required
            
          />
        </Form.Group>

        <Form.Group controlId="formTag" className="text-center w-50 mx-auto">
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
            onClick={handleAddNote}
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
