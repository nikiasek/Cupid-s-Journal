import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from "../context/authProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
const LOGOUT_URL = "auth/logout"

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const handleLogout = async() => {
      try {
        const response = await axiosPrivate.post(LOGOUT_URL, 
          {
            withCredentials: true
          }
        );
      console.log(response)
      setAuth({});
      navigate('/login');
      } catch(err) {
        console.log(err)
      };
    }

    handleLogout()
  }); 

  return (
    <div>Logging out...</div>
  );
};

export default Logout;