import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  console.log(user);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleRegister = () => {
    axios
      .post(`http://localhost:4000/api/register`, user)
      .then(res => {
        setUser(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <label>Username</label>
      <input
        placeholder="Username"
        name="username"
        value={user.username}
        onChange={handleChange}
      />

      <input
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
