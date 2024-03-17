import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 

// This component will receive props for the selected location data and the delete function.
function SelectedLocationInfo({climbs, setClimbs}) {
  const { user_id } = useParams();
  const [uniqueLocations, setUniqueLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null); 

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
  
      // Log the updated unique locations to verify
      console.log("Updated unique locations:", updatedLocations);
    })
    .catch(error => {
      console.log(error);
    });
  };    
  

  return (
    <div className="location-section">
      <h3 className="subheading">Locations:</h3>
      <ul className="locations-list">
      {/* Display unique locations */}
      {uniqueLocations.map(location => {
        return (
          <li key={location} onClick={() => handleLocationClick(location)}>
            {location}
          </li>
        );
      })}
      </ul>

      {selectedLocation && (
        <div className="selected-location-info">
          <h3>{selectedLocation}</h3>
          <div className="climbs-list">
            {/* Filter climbs based on selected location */}
            {climbs.filter(climb => climb.location === selectedLocation).map(filteredClimb => (
              <div key={filteredClimb.id} className="climb-container">
                <div className="climb">
                  <li>Location: {filteredClimb.location}</li>
                  <li>Date: {new Date(filteredClimb.date).toLocaleDateString()}</li>
                  <li>Grade: {filteredClimb.grade}</li>
                  <li>What grade it felt like: {filteredClimb.feels_like}</li>
                  <li>Additional notes: {filteredClimb.comment}</li>
                  <li>Style: {filteredClimb.style}</li>
                  <li>Tries: {filteredClimb.tries}</li>
                </div>
                <button
                  onClick={() => deleteClimb(filteredClimb.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedLocationInfo;
