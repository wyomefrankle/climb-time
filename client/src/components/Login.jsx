import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewUser from "./NewUser";

function Login() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic
    fetch(`/api/climbs/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user_id, password})
    })
      .then(result => {
        if (!result.ok) {
          throw new Error("Incorrect username or password");
        }
        return result.json();
      })
      .then(json => {
        // Assuming successful login, call onLogin with user_id
        // onLogin(user_id);
        // Redirect to the main application page
        window.location.href = `/climbs/${json.user_id}`;
      })
      .catch(error => {
        console.error("Error logging in:", error.message);
      });
  };

  return (
    <div>
    <h1>Welcome to the Login Page</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <h3>Don't have an account?</h3>
      <Link to="/new-user">Create New Account</Link>
    </div>
  );
}

export default Login;
