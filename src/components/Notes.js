import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import Loading from "./loading/Loading";

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
  if (Object.keys(error).length > 0) {
    return <h1>Error bruh</h1>;
  }
  ///

  return (
    <div>
      <h1 className="mainHead">Your Notes</h1>
      <div className="row notesBox">
        {/* Display filtered notes if search is triggered, otherwise display all notes */}
        {notes?.map((note, index) => {
          if (notes.length === index + 1) {
            return (
              <NoteItem
                key={index}
                note={note}
                // updateNote={updateNote}
                showAlert={props.showAlert}
                // onClickDelete={() => {
                //   setShowConfirmDel(true);
                //   setSelectedNoteForDeletion(note._id);
                // }}
                ref={lastNoteRef} // Here, assign the ref to the last note
              />
            );
          }

          return (
            <NoteItem
              key={index}
              note={note}
              // updateNote={updateNote}
              showAlert={props.showAlert}
              // onClickDelete={() => {
              //   setShowConfirmDel(true);
              //   setSelectedNoteForDeletion(note._id);
              // }}
            />
          );
        })}
      </div>
        {loading && <Loading/>}
        {(!loading && notes.length === 0) && <h2 className="mainHead">You haven't created any notes</h2>}
    </div>
  );
};

export default Notes;
