import React from "react";
import "./Error.css";
import { BiError } from "react-icons/bi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const Error = ({ error }) => {
  return (
    <div className="errorBox">
      <div className="firstDiag">
        <BiError className="errorIcon" />
        <h2>Oops! We ran into an error.</h2>
        {error?.message && (
          <h3 className="errorMessage">
            <MdOutlineSubdirectoryArrowRight id="Rarrow" />
            {`[${error?.message}]`}
          </h3>
        )}
      </div>
      <h2 id="suggestion">
        Try checking your internet connection or contact the Admin
      </h2>
    </div>
  );
};

export default Error;
