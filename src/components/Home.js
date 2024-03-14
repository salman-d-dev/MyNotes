import React, { useEffect } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {


  const {showAlert} = props;
  const NavigateTo = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")){
      NavigateTo("/signin");
    }
  }, []);
  return (
    <div className='homepage'>
      <Notes showAlert={showAlert}/>
    </div>
        )
}

export default Home
