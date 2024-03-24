import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; 
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import LocationMarkers from "./LocationMarkers.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


// This component will receive props for the selected location data and the delete function.
function SelectedLocationInfo({climbs, setClimbs}) {
  const { user_id } = useParams();
  const [uniqueLocations, setUniqueLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const [locations, setLocations] = useState([]); // State for storing location data
  const mapRef = useRef(null); // Reference to the MapContainer component
  const home_position = [52.38, 4.64]; // Default map center position
  const [newClimbLocation, setNewClimbLocation] = useState(null); // State variable to hold the currently selected location
  const [searchControl, setSearchControl] = useState(null); // State variable to hold the search control instance


  // Update uniqueLocations whenever climbs changes
  useEffect(() => {
    const locations = [...new Set(climbs.map(climb => climb.location))];
    setUniqueLocations(locations);
  }, [climbs]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };
  
  const deleteClimb = (id) => {
    fetch(`/api/climbs/${user_id}/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete climb");
      }
      // Remove the deleted climb from the state without mutating the original array
      const updatedClimbs = climbs.filter(climb => climb.id !== id);
      // Update the state with the filtered climbs
      setClimbs(updatedClimbs);
  
      // Update uniqueLocations based on the updated climbs
      const updatedLocations = [...new Set(updatedClimbs.map(climb => climb.location))];
      setUniqueLocations(updatedLocations);
    })
    .catch(error => {
      console.log(error);
    });
  };    

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
  

        // Update locations when climbs state changes
        useEffect(() => {
          const updatedLocations = climbs.map(climb => [parseFloat(climb.lat), parseFloat(climb.lng)]);
          setLocations(updatedLocations);
      }, [climbs]);
  

      return (
        <div className="App" style={{ marginBottom: '20px' }}>
          <div className="row">
            <div className="col">
              {/* Display unique locations */}
              <h3 className="subheading">Locations:</h3>
              <ul className="locations-list">
                {uniqueLocations.map(location => (
                  <li key={location} onClick={() => handleLocationClick(location)}>
                    {location}
                  </li>
                ))}
              </ul>
              {/* Render cards for selected location */}
              {selectedLocation && (
                <div>
                  <h3 className="subheading" style={{ fontSize: '27px' }}>{selectedLocation}</h3>
                  {/* Filter climbs based on selected location */}
                  {climbs.filter(climb => climb.location === selectedLocation).map(filteredClimb => (
                    <div key={filteredClimb.id} style={{ marginBottom: '20px' }}>
                      <div className="App" style={{ width: "30rem", backgroundColor: "#ffeba7" }}>
                        <div className="card-body">
                          <div className="card-text">
                            <p>Location: {filteredClimb.location}</p>
                            <p>Date: {new Date(filteredClimb.date).toLocaleDateString()}</p>
                            <p>Grade: {filteredClimb.grade}</p>
                            <p>What grade it felt like: {filteredClimb.feels_like}</p>
                            <p>Additional notes: {filteredClimb.comment}</p>
                            <p>Style: {filteredClimb.style}</p>
                            <p>Tries: {filteredClimb.tries}</p>
                          </div>
                          <button
                            onClick={() => deleteClimb(filteredClimb.id)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col">
              {/* MapContainer component */}
              <MapContainer center={home_position} zoom={10} ref={mapRef} scrollWheelZoom={false} style={{ height: "40vh", width: "40vw" }}>
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
          </div>
        </div>
      );
      
}

SelectedLocationInfo.propTypes = {
  climbs: PropTypes.func.isRequired,
  setClimbs: PropTypes.func.isRequired,
};


export default SelectedLocationInfo;
