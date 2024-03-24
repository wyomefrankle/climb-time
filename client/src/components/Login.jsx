import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div className="App" style={{ width: "40rem"}}>
      <h3 className='title' style={{ textAlign: "center"}}>Welcome back! </h3>
      <h5 style={{ textAlign: "center"}}>Please login to your account.</h5>
      <form className='form'>
        <div>
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            className="form-control"
            style={{ width: '40%' }}
          />
        </div>
        <div>
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            aria-describedby="passwordHelpBlock"
            style={{ width: '40%' }}
          />
        </div>
        <br/>
        <button type="button" onClick={handleLoginClick} className="btn">
          Login
        </button>
      </form>
      <h3 >Don&apos;t have an account?</h3>
      <Link to="/new-user">Create New Account</Link>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
