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
    <div style={{paddingBottom:'4rem'}}>

      <div className='homecont'>
      <Notes showAlert={showAlert}/>
      </div>
    </div>
        )
}

export default Home
