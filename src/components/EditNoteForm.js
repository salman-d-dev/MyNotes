import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { editNote } from "../api/editNote";
import { useNoteContext } from "../context/notes/noteContext";

const EditNoteForm = (props) => {
  const { selectedNote, setSelectedNote, setEditMode, notes, setNotes } =
    useNoteContext();

  const handleSaveEditNote = async (e) => {
    e.preventDefault();
    //backend edit
    const success = await editNote(
      selectedNote._id,
      selectedNote.title,
      selectedNote.description,
      selectedNote.tag
    );
    if (success) {
      props.showAlert("Note edited successfully", "success");
      setSelectedNote({ id: "", title: "", description: "", tag: "" });

      // Update the note in the frontend
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note._id === selectedNote._id) {
            // If the note's _id matches the id of the edited note
            return {
              ...note, // Keep the existing properties of the note
              title: selectedNote.title, // Update the title
              description: selectedNote.description, // Update the description
              tag: selectedNote.tag, // Update the tag
            };
          }
          return note; // Return unchanged note if _id doesn't match
        })
      );
      setEditMode(false);
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };

  const changeNote = (e) => {
    setSelectedNote({ ...selectedNote, [e.target.name]: e.target.value });
  };

  const handleCloseForm = () => {
    setSelectedNote({ id: "", title: "", description: "", tag: "" });
    setEditMode(false);
  };

  return (
    <div className="my-5 addNotesForm">
      <AiOutlineCloseSquare className="closeButton" onClick={handleCloseForm} />
      <h3 className="text-center mb-4">Edit Note</h3>
      <Form>
        <Form.Group controlId="formTitle" className="text-center mx-auto">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="tagField"
            type="text"
            placeholder="Enter title"
            onChange={changeNote}
            name="title"
            minLength={2}
            value={selectedNote.title}
            required
          />
        </Form.Group>

        <Form.Group
          controlId="formDescription"
          className="text-center mx-auto my-3"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="tagField"
            as="textarea"
            rows={3}
            placeholder="Enter description"
            onChange={changeNote}
            name="description"
            minLength={5}
            value={selectedNote.description}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTag" className="text-center mx-auto">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            className="actualtagField"
            type="text"
            placeholder="Any tag?"
            onChange={changeNote}
            name="tag"
            value={selectedNote.tag}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="mt-3 addNoteButton"
            onClick={handleSaveEditNote}
            disabled={
              !selectedNote.title.length ||
              !selectedNote.description.length
            }
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditNoteForm;
