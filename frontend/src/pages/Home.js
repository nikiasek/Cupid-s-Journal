import React from "react";
import {Link} from "react-router-dom";
import "../css/home.css";
import Header from "../components/Header";



const Home = () => {
    const isLoggedIn = localStorage.getItem("loggedIn")
    var message = "";
    var buttonMessage = "";
    var buttonLink ="";
    if(isLoggedIn === "true") {
        message = "Start creating your own letters";
        buttonMessage = "Editor";
        buttonLink= "/Editor";
    }
    else {
        message = "Do you have an account?";
        buttonMessage = "Sign in";
        buttonLink = "/signup";
    };


    return (
        <>
            <Header />
            <div className="homeClass">

                <h1 className="roboto-bold">Messages for your loved ones</h1>
                <p className="roboto-light">{message}</p>
                <Link to={buttonLink} > <button>{buttonMessage}</button> </Link>
            </div>
        </>
    )
  };
  
  export default Home;
  