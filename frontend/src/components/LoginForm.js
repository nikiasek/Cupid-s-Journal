import React, { useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "../css/auth.css";
import useAuth from '../hooks/useAuth';
import axios from "../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({ email, password}),
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true
        }
      );
      console.log(response);
      const accessToken = response?.data?.accessToken;
      setAuth({email, password, accessToken});
      navigate("/")
    } catch (error) {
      console.error("Authentication failed:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      }
      else if(error.response.status === 400) {
        console.log("missing email or password")
      }
      else if(error.response.status === 401) {
        console.log("Unauthorized")
      }
      else {
        setErrorMessage("No server response");
      }
    }
  };

  return (
    <div>
      <div className="header-auth">
        <Link to="/"><div id="heart"></div></Link>
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
            placeholder="Email"
            className="input-auth"
            type="email"
          />
          <br />

          <p className="p-auth">password</p>
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
        <p>Are you new to Cupid's Journal? <Link to="/signup"><button className="button-auth" >Signup here</button></Link></p>
        <Outlet />
      </div>
    </div>
  );
};

export default Login;