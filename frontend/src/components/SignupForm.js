import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

const USER_REGEX = /^.{5,20}/;
const PWD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/;
const REGISTER_URL = '/auth/register';

const Registration = () => {
  const [username, setUsername] = useState("");
  const [validUser, setValidUser] = useState(false)

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");

  const Navigate = useNavigate();

  useEffect(() =>{
    setValidUser(USER_REGEX.test(username))
  },[username])

  useEffect(() =>{
    setValidPwd(PWD_REGEX.test(password));
  },[password]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidUser(USER_REGEX.test(username))
    setValidPwd(PWD_REGEX.test(password));
    console.log(validPwd, validUser) 

    if(validPwd && validUser && email.length != 0) {
      setMessage("Correct")
      try {
        const response = await axios.post(REGISTER_URL, {
          username,
          password,
          email
        });
        setMessage(response.data.message);
        Navigate("/login")
      } catch (error) {
        console.error("Registration failed:", error.response.data.error);
        setMessage(error.response.data.error);
      }
    } else if(!validPwd &&  !validUser && (email.length === 0)) {
      setMessage("Please enter valid values");
    } else if(!validUser) {
      setMessage("Please enter valid username");
    } else if(email.length === 0) {
      setMessage("Please enter valid email")
    } else {
      setMessage("Please enter valid password");
    }
  };

  return (
    <div>
      <div className="header-auth">
      <Link to="/"><div id="heart"></div></Link>
      </div>
      <div className="container-auth">
        <h1>Please, signup!</h1>
        <form onSubmit={handleSubmit}>
          <p className="p-auth">Username</p>
          <h6 className="signupParameter">Make your username between 5 to 20 characters long</h6>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input-auth"
          />
          <br />
          <p className="p-auth">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-auth"
          />
          <br />
          <p className="p-auth">Password</p>
          <h6 className="signupParameter">Make password betweeen 8 to 20 characters long containing digit and a symbol</h6>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-auth"
          />
          <br />
          <button type="submit" className="button-auth">Signup</button>
        </form>
      </div>
      <div className="container-auth">
        <p>Do you already have account? <Link to="/login"><button className="button-auth" >Login here</button></Link> </p>
        {message && <p>{message}</p>}
        <Outlet />
      </div>
    </div>
    
  );
};

export default Registration;