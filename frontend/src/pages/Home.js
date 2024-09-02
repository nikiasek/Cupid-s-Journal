import { React, useContext} from "react";
import {Link} from "react-router-dom";
import "../css/home.css";
import Header from "../components/Header";
import { AuthContext } from "../components/authContext";



const Home = () => {
    var message = "";
    var buttonMessage = "";
    var buttonLink ="";
    const {token, loading} = useContext(AuthContext)



    if(!token) {
        message = "Do you have an account?";
        buttonMessage = "Sign in";
        buttonLink = "/signup";
    }
    else {
        message = "Start creating your own letters";
        buttonMessage = "Editor";
        buttonLink= "/Editor";
    }


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
  