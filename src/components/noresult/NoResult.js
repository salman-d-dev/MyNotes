import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext';
import './NoResult.css'

const NoResult = () => {
    const NoteContext = useContext(noteContext);
  const { searchKeyword } = NoteContext;
  return (
    <div className='noresult'>
        <h2>
            {searchKeyword? `No results found for "${searchKeyword}"` : 'No results found'}
        </h2>
    </div>
  )
}

export default NoResult