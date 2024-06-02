import React from 'react'
import "../css/header.css"
import { MdAccountCircle } from "react-icons/md";
import { FaRegWindowMaximize } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Outlet, Link } from "react-router-dom";

 
const Header = () => {
  return (
    <IconContext.Provider value={{className: "react-icons"}}>
            <nav>
                <div className="header">
                    <div className="app">
                        <Link to="/Editor" ><FaRegWindowMaximize /> </Link>
                        <Link to="/Home/Inspiration" ><FaMessage /></Link>
                    </div>
                    <div className="logo">
                        <Link to="/" ><div id="heart"></div></Link>
                    </div>
                    <div className="account">
                        <Link to="/account"><MdAccountCircle />  </Link>
                    </div>
                </div>
            </nav>
        <Outlet />
    </IconContext.Provider>
  )
}

export default Header
