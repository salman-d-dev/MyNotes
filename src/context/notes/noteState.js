
import { useLocation, useNavigate } from "react-router-dom";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword]= useState("")
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchResults , setSearchResults] = useState(0);
  const [query, setQuery] = useState("")
  const [buttonLoading, setButtonLoading] = useState(false)
  const [selectedNote, setSelectedNote] = useState({id: '', title: '', description: '', tag: ''})
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm ] = useState(false)

  const navigateTo = useNavigate();
  const location = useLocation();
  const path = location.pathname;


  
  return (
    <noteContext.Provider
    value={{
      notes,
      setNotes,
      searchKeyword, setSearchKeyword,
      searchTriggered,setSearchTriggered,
      searchResults , setSearchResults,
      buttonLoading, setButtonLoading,
      query, setQuery,
      selectedNote, setSelectedNote,
      editMode, setEditMode,
      showAddForm, setShowAddForm,
      navigateTo, path
    }}
  >
    {props.children}
  </noteContext.Provider>
  );
};

export default NoteState;
