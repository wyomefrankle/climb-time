import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectedLocationInfo from "./SelectedLocationInfo.jsx";
import InputForm from "./InputForm.jsx";
import { Link, Outlet } from "react-router-dom";
import Login from './Login';
import { useParams } from "react-router-dom"; 


export default function Climbs() {
    // Retrieve the user_id parameter from the URL
    const { user_id } = useParams();
    const [climbs, setClimbs] = useState([]);

    useEffect(() => {
      getClimbs(user_id);
    }, []);

    // This function handles the login logic
    const handleLogin = (user_id) => {
        // Perform actions related to successful login, such as setting authentication state
        console.log(`User ${user_id} logged in successfully.`);
    };
  
    const getClimbs = (user_id) => {
      fetch(`/api/climbs/${user_id}`)
        .then((response) => response.json())
        .then((climbs) => {
          setClimbs(climbs);
        })
        .catch((error) => {
          console.error("Error fetching climbs:", error);
        });
    };
  
    return (
      <div className="App">
        <h1 className="title">{user_id}'s Climbing Log</h1>
        {/* <h3 className="subheading"> Add new Climb: </h3> */}
        {/* <InputForm climbs={climbs} getClimbs={getClimbs} /> Pass props */}
  
        <SelectedLocationInfo climbs={climbs} setClimbs={getClimbs} />
      </div>
    );
}