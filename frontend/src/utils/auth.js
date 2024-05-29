import axios from 'axios';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // Optionally, you can validate the token with a backend call
  return true;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
