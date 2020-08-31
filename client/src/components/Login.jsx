import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    axios
      .post(`http://localhost:4000/api/login`, user)
      .then(res => {
        console.log(res);
        setUser(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>Username</label>
      <input
        placeholder="Username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
