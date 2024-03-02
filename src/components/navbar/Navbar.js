import React, { useContext, useState } from "react";
import "./Navbar.css";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineCloseSquare } from "react-icons/ai";
import noteContext from "../../context/notes/noteContext";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaTurnDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const NoteContext = useContext(noteContext);
  const { searchKeyword, setSearchKeyword } = NoteContext;

  const handleSearchFieldDataChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
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
            disabled={!localStorage.getItem('token')}
          />
          <button onClick={handleSearch} disabled={!localStorage.getItem('token')}>
            Search
          </button>
        </div>
        {localStorage.getItem('token')?
          (<span onClick={handleLogout}><MdLogout/> Logout</span>) :
          <Link to="/signin">
          <span>(Please Login)</span>
          </Link>
        }
        <div className="followMe">
          <span>Follow Me <FaTurnDown/></span>
          <div className="social">
            <a href="https://github.com/Salman-at-github" target="_blank" rel="noreferrer">
            <FaGithub/>
            </a>
            <a href="https://www.linkedin.com/in/dev-salm/" target="_blank" rel="noreferrer">
            <FaLinkedin/>
            </a>
            <a href="https://github.com/Salman-at-github" target="_blank" rel="noreferrer">
            <FaFacebook/>
            </a>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
