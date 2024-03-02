import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
// import noteContext from '../context/notes/noteContext';
import noteicon from './static/noteicon.png';
import deleteIcon from './static/deleteIcon.svg';
import editIcon from './static/editIcon.svg';

const NoteItem = (props) => {
  const { note, updateNote,onClickDelete,searched } = props;

  const [expandNote, setExpandNote] = useState(false);

  // for delete icon hover message
  const [deleteIcoMessage, setDeleteIcoMessage] = useState('');
  const handleMouseOverDel = () => {
    setDeleteIcoMessage('Delete Note');
  };

  const handleMouseOutDel = () => {
    setDeleteIcoMessage('');
  };

  //for edit icon hover message
  const [editIcoMessage, setEditIcoMessage] = useState('');
  const handleMouseOverEdit = () => {
    setEditIcoMessage('Edit Note');
  };

  const handleMouseOutEdit = () => {
    setEditIcoMessage('');
  };



  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      setExpandNote(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
      //<div className='col-md-3'>
        <Card className={searched? "my-3 noteCard searchedNoteCard":"my-3 noteCard"} >
          <Card.Img variant='top' src={noteicon} id='noteicon' />
          <Card.Body className='pb-2'>
            <Card.Title className='noteTitle'>{note.title}</Card.Title>
            <Card.Text className={expandNote ? 'noteExpanded' : 'noteDescription'}>
              {!expandNote && note.description.length > 100 ? (
                <div>
                  <div>
                    {note.description.slice(0, 100)}
                    <span style={{ color: 'yellow', fontSize: '1.2rem' }}> .....</span>
                  </div>
                  <div>
                    <span className='readMoreButton mt-2' onClick={() => setExpandNote(!expandNote)}>
                      Read More
                    </span>
                  </div>
                </div>
              ) : (
                note.description
              )}
              {expandNote && note.description.length > 100 && (
                <div>
                  <span className='readMoreButton mt-2' onClick={() => setExpandNote(!expandNote)}>
                    Close
                  </span>
                </div>
              )}
            </Card.Text>
            <Card.Subtitle className='my-3 noteTag'>{note.tag}</Card.Subtitle>

            <div className='noteDate'>
              {new Date(note.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </div>
            
            <img
              src={editIcon} alt='Edit Icon' className='editIconSvg' onClick={() => {
                  updateNote(note)}} onMouseOver={handleMouseOverEdit} onMouseOut={handleMouseOutEdit} />
            {editIcoMessage && <div className='editIconMessage'>{editIcoMessage}</div>}
            
            <img
              src={deleteIcon} alt='Delete Icon' className='deleteIconSvg' onClick={onClickDelete} onMouseOver={handleMouseOverDel} onMouseOut={handleMouseOutDel}  />
            {deleteIcoMessage && <div className='deleteIconMessage'>{deleteIcoMessage}</div>}

          </Card.Body>
        </Card>
      //</div>
  );
};

export default NoteItem;
