import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Perform login logic
    fetch(`/api/climbs/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id, password })
    })
      .then(result => {
        if (!result.ok) {
          throw new Error("Incorrect username or password");
        }
        return result.json();
      })
      .then(json => {
        // Assuming successful login, call onLogin with user_id
        handleLogin(json.user_id); // Pass user_id to parent App component
        // Redirect to the main application page
        navigate(`/climbs/${json.user_id}`);
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
            className="form-style"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-style"
          />
        </div>
        <button type="button" onClick={handleLoginClick} className="btn">
          Login
        </button>
      </form>
      <h3>Don't have an account?</h3>
      <Link to="/new-user">Create New Account</Link>
    </div>
  );
}

export default Login;
