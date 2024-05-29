import React from 'react';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
