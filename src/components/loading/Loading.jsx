import React from "react";
import "./Loading.css";
import { ImSpinner9 } from "react-icons/im";




const Loading = () => {
  return (
      <div className="notesBox loader">
        
        <div className="skel">
          <ImSpinner9 className="spinner"/>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyIcons">
            <div className="dummyIcon"></div>
            <div className="dummyIcon"></div>
          </div>
        </div>
        <div className="skel">
          <ImSpinner9 className="spinner"/>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyIcons">
            <div className="dummyIcon"></div>
            <div className="dummyIcon"></div>
          </div>
        </div>
        <div className="skel">
          <ImSpinner9 className="spinner"/>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyIcons">
            <div className="dummyIcon"></div>
            <div className="dummyIcon"></div>
          </div>
        </div>
        <div className="skel">
          <ImSpinner9 className="spinner"/>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyLine"></div>
          <div className="dummyIcons">
            <div className="dummyIcon"></div>
            <div className="dummyIcon"></div>
          </div>
        </div>
       
      </div>
  );
};

export default Loading;
