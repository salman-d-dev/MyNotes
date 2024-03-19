import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useNoteContext } from "../../context/notes/noteContext";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaTurnDown } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchNotes } from "../../api/searchNotes";
import { ImSpinner9 } from "react-icons/im";
const Navbar = () => {
  const { searchKeyword, setSearchKeyword, setSearchTriggered, setSearchResults,setNotes,buttonLoading, setButtonLoading, setQuery } = useNoteContext();

  const {pathname} = useLocation();
  
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu((prevOption) => !prevOption);
  };


  //close menu on navigation
  useEffect(()=>{
    setShowMenu(false)
  },[pathname])

  const handleSearchFieldDataChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = async(e) => {
    if(searchKeyword){
      try {
        setButtonLoading(true)
        setQuery(searchKeyword)
        const data = await searchNotes(1,8, searchKeyword)
        setSearchTriggered(true)
        setButtonLoading(false)
        setNotes(data?.notes)
        setSearchResults(data?.totalResults)
        
      } catch (error) {
        throw error
      }
    }
  };
 

  const navigateTo = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigateTo('/signin')
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
            {buttonLoading? <ImSpinner9 className="searchIcon"/> : "Search"}
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
