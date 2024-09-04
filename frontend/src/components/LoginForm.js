import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "../css/auth.css"



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log("kokot jde to")
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Set the error message if present in the error response
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="header-auth">
      <div id="heart"></div>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      <div className="container-auth">
        <h1>Please, login!</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <p className="p-auth">username</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email email"
            className="input-auth"
            type="email"
          />
          <br />

          <p className="p-auth">paswword</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-auth"
          />
          <br />
          <button type="submit" className="button-auth">Login</button>
        </form>
      </div>
      <div className="container-auth">
        <p>Are you new to Cupid? <Link to="/signup">sign here</Link></p>
        <Outlet />
      </div>
    </div>
  )
};

export default Login;