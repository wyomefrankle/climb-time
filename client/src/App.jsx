import "./App.css";
import "./Navbar.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Climbs from "./components/Climbs";
import Climb from "./components/Climb";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import NewUser from "./components/NewUser";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setLoggedInUser(storedUserId);
      }
    } catch (error) {
      console.error("Error fetching user ID from localStorage:", error);
    }
  }, []);  

  const handleLogin = async (user_id) => {
    try {
      setLoggedInUser(user_id);
      localStorage.setItem("user_id", user_id);
      navigate(`/climbs/${user_id}`);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };  

  const handleLogout = async () => {
    try {
      setLoggedInUser(null);
      localStorage.removeItem("user_id");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };  

  return (
    <>
      {/* <h1>ClimbTime </h1> */}
      <nav className="navbar">
        <ul className="navbar-list">
        <li className="navbar-item-logo">
          <h1 className="navbar-item-logo">ClimbTime</h1>
        </li> <br/>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          {loggedInUser && (
            <>
              <li className="navbar-item">
                <Link to={`/climbs/${loggedInUser}`} className="navbar-link">My Climbs</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="btn">Logout</button>
              </li>
            </>
          )}
          {!loggedInUser && (
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Log in</Link>
            </li>
          )}

        </ul>
        <footer className="text-white-50 text-center p-3">
        Created by Wyome Frankle
      </footer>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/new-user" element={<NewUser />} />
        {/* Define route for displaying climbs for a specific user */}
        <Route path="/climbs/:user_id" element={<Climbs />} />
        <Route path="/climbs/:user_id/:id" element={<Climb />} />
      </Routes>
    </>
  );
}

export default App;
