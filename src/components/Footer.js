import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import githubIcon from './static/github.svg';
import linkedInIcon from './static/linkedin.svg';
import facebookIcon from './static/facebook.svg';
import authContext from "../context/notes/authContext";

const Footer = () => {

    const [userName, setUserName] = useState(null);
    const { getUserDataF } = useContext(authContext);
    const NavigateTo = useNavigate();
    const path = useLocation().pathname;

    useEffect(() => {
          const userInfo = async () => {
            const gotData = await getUserDataF();
            setUserName(gotData.name);
          };
          if(path !== '/signin' && path !== '/signin' && path !== '/resetpassword'){

              userInfo();
          }
      }, [NavigateTo]);

    const openFB = () => {
        window.open('https://www.facebook.com', '_blank', 'noreferrer');
    };
    const openLinkedin = () => {
        window.open('https://www.linkedin.com/in/salman-khan-a2957925b', '_blank', 'noreferrer');
    };
    const openGithub = () => {
        window.open('https://github.com/Salman-at-github', '_blank', 'noreferrer');
    };
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        NavigateTo('/signin')
    }

    return (<>
        <div className="mt-4">

            <footer className="text-center text-lg-start bg-light text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-2 border-bottom footerLine" >
                    <div className="me-5 d-none d-lg-block">
                        <span style={{color:"white"}}>Get connected with us on social networks:</span>
                    </div>

                    <div className="mx-5 iconsBox">
                    <img
              src={githubIcon} alt='GitHub' className='githubIcon' onClick={openGithub} />
                        <img
              src={linkedInIcon} alt='LinkedIn' className='linkedinIcon' onClick={openLinkedin} />
                        <img
              src={facebookIcon} alt='Facebook' className='facebookIcon' onClick={openFB} />
                    </div>
                </section>

                <div className="text-center p-2 footerLine" style={{color:"white",borderTop:'1px solid white' }}>
                    <p className="text-reset fw-bold" >© Copyright 2023 MyNotes</p>
                    {(location.pathname === '/') ? <p style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: "inline-block",
                        color:"blue"
                    }} onClick={handleLogout}>Log out  {userName? `( ${userName} )`:null }</p> : ''}
                </div>
            </footer>
        </div>
    </>)
}

export default Footer
