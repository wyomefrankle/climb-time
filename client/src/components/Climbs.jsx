import "../App.css";
import { useState, useEffect, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectedLocationInfo from "./SelectedLocationInfo.jsx";
import InputForm from "./InputForm.jsx";
import { useParams } from "react-router-dom"; 

export default function Climbs() {
    const { user_id } = useParams();
    const [climbs, setClimbs] = useState([]);

    const getClimbs = useCallback((user_id) => {
      fetch(`/api/climbs/${user_id}`)
        .then((response) => response.json())
        .then((climbs) => {
          setClimbs(climbs);
        })
        .catch((error) => {
          console.error("Error fetching climbs:", error);
        });
    }, []);

    const handleAddClimb = useCallback((newClimb) => {
        // Logic to add new climb, then fetch climbs
        getClimbs(user_id);
    }, [getClimbs, user_id]);
  
    useEffect(() => {
      getClimbs(user_id);
    }, [user_id, getClimbs]);
  
    return (
      <div className="App">
        <h1 className="title">{user_id}'s Climbing Log</h1>
        <SelectedLocationInfo climbs={climbs} setClimbs={setClimbs} handleAddClimb={handleAddClimb}/>
        <InputForm climbs={climbs} getClimbs={getClimbs} handleAddClimb={handleAddClimb}/>
      </div>
    );
}
