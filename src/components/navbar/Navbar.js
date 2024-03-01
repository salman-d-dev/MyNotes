import React, { useContext, useState } from "react";
import "./Navbar.css";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineCloseSquare } from "react-icons/ai";
import noteContext from "../../context/notes/noteContext";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaTurnDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const NoteContext = useContext(noteContext);
  const { searchKeyword, setSearchKeyword } = NoteContext;

  const handleSearchFieldDataChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    // setSearchTriggered(true);
    // filterNotes(searchKeyword);
  };
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu((prevOption) => !prevOption);
  };

  const NavigateTo = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    NavigateTo('/signin')
}
  return (
    <div className="navbar">
      <div id="mainLogo">
        <span id="logoMy">My</span>
        <span id="logoNotes">Notes</span>
      </div>
      <IoMdMenu className="menu-icon" onClick={toggleMenu} />
      <div className="dropdown" id={showMenu ? "show" : "noshow"}>
        <AiOutlineCloseSquare id="closeButton" onClick={toggleMenu} />
        <div id="searchBar">
          <input
            type="text"
            className="searchInput"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearchFieldDataChange}
          />
          <button className="addNoteButton" onClick={handleSearch}>
            Search
          </button>
        </div>
        {localStorage.getItem('token')?
          (<span onClick={handleLogout}><MdLogout/> Logout</span>) :
          null
        }
        <div className="followMe">
          <span>Follow Me <FaTurnDown/></span>
          <div className="social">
            <a href="https://github.com/Salman-at-github" target="_blank" referrerPolicy="no-referrer">
            <FaGithub/>
            </a>
            <a href="https://github.com/Salman-at-github" target="_blank" referrerPolicy="no-referrer">
            <FaLinkedin/>
            </a>
            <a href="https://github.com/Salman-at-github" target="_blank" referrerPolicy="no-referrer">
            <FaFacebook/>
            </a>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
