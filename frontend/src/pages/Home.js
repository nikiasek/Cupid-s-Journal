import { React } from "react";
import {Link} from "react-router-dom";
import "../css/home.css";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import Users from "../components/users"

const Home = () => {
    const { auth } = useAuth();
    var message = "";
    var buttonMessage = "";
    var buttonLink ="";
    
    
    console.log(Object.keys(auth).length === 0)

    const isEmpty = (auth) => {
        return Object.keys(auth).length === 0
    }
      


    if(Object.keys(auth).length === 0) {
        message = "Do you have an account?";
        buttonMessage = "Sign in";
        buttonLink = "/signup";
    }
    else {
        message = "Start creating your own letters";
        buttonMessage = "Editor";
        buttonLink= "/projectBrowser";
    }


    return (
        <>
            <Header />
            <div className="homeClass">

                <h1 className="roboto-bold">Messages for your loved ones</h1>
                <p className="roboto-light">{message}</p>
                <Link to={buttonLink} > <button>{buttonMessage}</button> </Link>
            </div>
            <Users />
        </>
    )
  };
  
  export default Home;
  