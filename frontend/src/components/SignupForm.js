import React, { useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
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
  };

  return (
    <div>
      <div className="header-auth">
      <div id="heart"></div>
      </div>
      <div className="container-auth">
        <h1>Please, signup!</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <p className="p-auth">Username</p>
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
        <p>Are you new to Cupid? <Link to="/login">Login here</Link></p>
        {message && <p>{message}</p>}
        <Outlet />
      </div>
    </div>
    
  );
};

export default Registration;