import "../App.css";
import { useState, useEffect, useCallback,useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectedLocationInfo from "./SelectedLocationInfo.jsx";
import InputForm from "./InputForm.jsx";
import { useParams } from "react-router-dom"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

export default function Climbs( ) {
    const { user_id } = useParams();
    const [climbs, setClimbs] = useState([]);
    const [locations, setLocations] = useState([]);
    const mapRef = useRef(null);
    // const locations = [[52.38, 4.64],[52.48, 4.64]]
    const home_position = [52.38, 4.64]

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
  
    useEffect(() => {
      getClimbs(user_id);
    }, [user_id, getClimbs]);

    // Update locations when climbs state changes
    useEffect(() => {
        const updatedLocations = climbs.map(climb => [parseFloat(climb.lat), parseFloat(climb.lon)]);
        setLocations(updatedLocations);
    }, [climbs]);
    
    return (
      <div className="App">
        <h1 className="title">{user_id}&apos;s Climbing Log</h1>
        <div className="map">
            <MapContainer center={home_position} zoom={10} ref={mapRef} scrollWheelZoom={false} style={{height: "50vh", width: "50vw"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {locations.length > 0 && locations.map((location, index) => (
              <Marker key={index} position={[location[0], location[1]]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            ))}
            </MapContainer>
            </div>
        <SelectedLocationInfo climbs={climbs} setClimbs={setClimbs} />
        <InputForm climbs={climbs} getClimbs={getClimbs} />
      </div>
    );
}
