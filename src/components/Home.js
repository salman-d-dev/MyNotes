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
  return (<>
    <div>
      <div>
        <h2 className='hhome'>
          <span className='mainHead11'>My</span><span className='mainHead12'>Notes</span><span className='mainHead2'> - Your Notebook on the Cloud</span>  
        </h2>
      </div>
      <div className='homecont'>
      <Notes showAlert={showAlert}/>
      </div>
      <div>
      </div>
    </div>
        </>)
}

export default Home
