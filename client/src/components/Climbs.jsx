import "../App.css";
import { useState, useEffect, useCallback, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectedLocationInfo from "./SelectedLocationInfo.jsx";
import InputForm from "./InputForm.jsx";
import LocationMarkers from "./LocationMarkers.jsx";
import { useParams } from "react-router-dom"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

export default function Climbs() {
    const { user_id } = useParams(); // Extracting user_id from URL parameters
    const [climbs, setClimbs] = useState([]); // State for storing climbing data
    const [locations, setLocations] = useState([]); // State for storing location data
    const mapRef = useRef(null); // Reference to the MapContainer component
    const home_position = [52.38, 4.64]; // Default map center position
    const [newClimbLocation, setNewClimbLocation] = useState(null); // State variable to hold the currently selected location
    const [searchControl, setSearchControl] = useState(null); // State variable to hold the search control instance

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
    }, [user_id]);

    // Update locations when climbs state changes
    useEffect(() => {
        const updatedLocations = climbs.map(climb => [parseFloat(climb.lat), parseFloat(climb.lng)]);
        setLocations(updatedLocations);
    }, [climbs]);

    // Add the search control to the map
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const provider = new OpenStreetMapProvider();
        const control = new GeoSearchControl({
            provider: provider,
        });

        control.addTo(map); // Add the control to the map

        setSearchControl(control); // Save control instance to state

        return () => {
            map.removeControl(control); // Remove control when component unmounts
        };
    }, [locations]);

    return (
        <div className="App">
            <h1 className="title">{user_id}&apos;s Climbing Log</h1>
            <div className="map">
                {/* MapContainer component */}
                <MapContainer center={home_position} zoom={10} ref={mapRef} scrollWheelZoom={false} style={{ height: "50vh", width: "50vw" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Render markers for each location */}
                    {locations.length > 0 && locations.map((location, index) => (
                        <Marker key={index} position={[location[0], location[1]]}>
                            <Popup>
                                This is {location[0]}
                            </Popup>
                        </Marker>
                    ))}
                    {/* LocationMarkers component */}
                    <LocationMarkers setNewClimbLocation={setNewClimbLocation} locations={locations} setLocations={setLocations}/>
                </MapContainer>
            </div>
            {/* SelectedLocationInfo component */}
            <SelectedLocationInfo climbs={climbs} setClimbs={setClimbs} />
            {/* InputForm component */}
            <InputForm climbs={climbs} getClimbs={getClimbs} newClimbLocation={newClimbLocation} />
        </div>
    );
}
