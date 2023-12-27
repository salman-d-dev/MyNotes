import React from "react";

const ConfirmComp = (props) => {
  return (
    <div className="confirmBox">
      <div className="confirmMessage">
        <strong>Are you sure you want to delete this note?</strong>
      </div>
      <div className="buttonGroup">
        <button className="addNoteButton" id="yesButton" onClick={props.onYesClick}>Yes</button>
        <button className="addNoteButton" id="noButton" onClick={props.onNoClick}>No</button>
      </div>
    </div>
  );
};

export default ConfirmComp;
