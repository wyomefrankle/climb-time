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
    }, [climbs]);
  
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

        <SelectedLocationInfo climbs={climbs} setClimbs={getClimbs} />
        <InputForm climbs={climbs} getClimbs={getClimbs} />

      </div>
    );
}