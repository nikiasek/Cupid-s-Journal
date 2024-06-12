import React from "react"
import "../css/home.css"
import Header from "../components/Header"


const Home = () => {
    const isLoggedIn = localStorage.getItem("loggedIn")
    var message = ""
    var buttonMessage = ""
    if(isLoggedIn == "true") {
        message = "Start creating your own letters"
        buttonMessage = "Editor"
    }
    else {
        message = "Do you have an account?"
        buttonMessage = "Sign in"
    }


    return (
        <>
            <Header />
            <div className="homeClass">

                <h1 className="roboto-bold">Messages for your loved ones</h1>
                <p className="roboto-light">{message}</p>
                <button> {buttonMessage}</button>
            </div>
        </>
    )
  };
  
  export default Home;
  