import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ loggedInUser }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        {!loggedInUser && (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        )}
        {loggedInUser && (
          <li>
            <Link to={`/climbs/${loggedInUser}`}>My Climbs</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
