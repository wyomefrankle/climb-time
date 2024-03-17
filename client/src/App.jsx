import "./App.css";
// import "react-datepicker/dist/react-datepicker.css";
// import SelectedLocationInfo from "./components/SelectedLocationInfo.jsx";
// import InputForm from "./components/InputForm.jsx";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Climbs from "./components/Climbs";
import Climb from "./components/Climb";
import { useState } from "react";
import Login from "./components/Login";
import NewUser from "./components/NewUser";


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  return (
    <>
      <h1>Boulder book </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!loggedInUser && (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
          {loggedInUser && (
            <li>
              <Link to="/climbs">My Climbs</Link>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-user" element={<NewUser />} />
        {/* Define route for displaying climbs for a specific user */}
        <Route path="/climbs/:user_id" element={<Climbs />} />
        <Route path="/climbs/:user_id/:id" element={<Climb />} />
      </Routes>
    </>
  );
}
export default App;
