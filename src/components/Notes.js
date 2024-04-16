import React, { useCallback, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import useGetNotes from "../hooks/useGetNotes";
import Loading from "./loading/Loading";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNoteContext } from "../context/notes/noteContext";
import AddNotesForm from "./AddNotesForm";
import EditNoteForm from "./EditNoteForm";
import Error from "./error/Error";
import { sortByDate } from "../utils/helpers";

const Notes = (props) => {
  const NavigateTo = useNavigate();

  const {
    searchTriggered,
    setSearchTriggered,
    searchResults,
    query,
    setNotes,
    buttonLoading,
    setSearchKeyword,
    editMode,
    showAddForm,
    setShowAddForm,
  } = useNoteContext();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      NavigateTo("/signin");
    }
  }, []);

  const [pageNum, setPageNum] = useState(1);

  const { loading, error, notes, hasMore } = useGetNotes(pageNum, 8);

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
  if (error?.message) {
    return <Error error={error} />;
  }
  const handleClearSearch = () => {
    setSearchTriggered(false);
    setSearchKeyword("");
    //clear notes for re-fetching
    setNotes([]);
  };

  const toggleAddForm = () => {
    setShowAddForm((prevState) => !prevState);
  };

  const sortedNotes = sortByDate(notes);

  return (
    <div>
      <button className="addNoteButton" id="addNote" onClick={toggleAddForm}>
        {showAddForm ? "Close Form" : "Add Note"}
      </button>
      {showAddForm && <AddNotesForm {...props} />}
      {editMode && <EditNoteForm {...props} />}
      <h1 className="mainHead">Your Notes</h1>
      {searchTriggered && !buttonLoading && (
        <h1 className="mainHead">
          {`${searchResults} ${
            searchResults === 1 ? "Result" : "Results"
          } found for "${query}"`}
          <IoIosCloseCircleOutline
            onClick={handleClearSearch}
            id="clearSearch"
            title="Clear Search"
          />
        </h1>
      )}
      <div className="row notesBox">
        {/* Display filtered notes if search is triggered, otherwise display all notes */}
        {sortedNotes.map((note, index) => {
          if (sortedNotes.length === index + 1) {
            return (
              <NoteItem
                key={note._id}
                note={note}
                showAlert={props.showAlert}
                ref={lastNoteRef} // Here, assign the ref to the last note
              />
            );
          }

          return (
            <NoteItem
              key={index}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
      {loading && <Loading />}
      {!loading && !searchTriggered && notes.length === 0 && (
        <h2 className="mainHead">You haven't created any notes</h2>
      )}
    </div>
  );
};

export default Notes;
