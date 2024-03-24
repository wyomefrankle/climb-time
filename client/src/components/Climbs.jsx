import "../App.css";
import { useState, useEffect, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectedLocationInfo from "./SelectedLocationInfo.jsx";
import InputForm from "./InputForm.jsx";
import LocationMarkers from "./LocationMarkers.jsx";
import { useParams } from "react-router-dom"; 
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

export default function Climbs() {
    const { user_id } = useParams(); // Extracting user_id from URL parameters
    const [climbs, setClimbs] = useState([]); // State for storing climbing data
    const [newClimbLocation, setNewClimbLocation] = useState(null); // State variable to hold the currently selected location

    // Function to fetch climbing data from the API
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

    // Fetch climbing data when user_id changes
    useEffect(() => {
        getClimbs(user_id);
    }, [user_id, getClimbs]);

    return (
        <div className="App">
            <h1>{user_id}&apos;s Climbing Log</h1>
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        {/* SelectedLocationInfo component */}
                        <SelectedLocationInfo climbs={climbs} setClimbs={setClimbs} setNewClimbLocation={setNewClimbLocation}/>
                        {/* InputForm component */}
                        <InputForm climbs={climbs} getClimbs={getClimbs} newClimbLocation={newClimbLocation}/>
                        {/* <LocationMarkers setNewClimbLocation={setNewClimbLocation} /> */}
                    </div>
            </div> 
        </div>
    </div>
    );
}
