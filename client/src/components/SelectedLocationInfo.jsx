import { useState } from "react";

// This component will receive props for the selected location data and the delete function.
function SelectedLocationInfo({climbs, setClimbs}) {

  const [selectedLocation, setSelectedLocation] = useState(null); 

  // Get unique locations from climbs array
  const uniqueLocations = [...new Set(climbs.map(climb => climb.location))];

  
  const handleLocationClick = (climb) => {
    setSelectedLocation(climb);
  };
  
  const deleteClimb = (id, user_id) => {
    fetch(`/api/climbs/${user_id}/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete climb");
      }
      // Remove the deleted climb from the state
      const updatedClimbs = climbs.filter(climb => climb.id !== id);
      // Update the state with the filtered climbs
      setClimbs(updatedClimbs);
      // Clear the selectedLocation if it matches the deleted climb
      if (selectedLocation && selectedLocation.id === id) {
        setSelectedLocation(null);
      }
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
        {uniqueLocations.map(location => (
          <li key={location} onClick={() => handleLocationClick({ location })}>{location}</li>
        ))}
      </ul>

      {selectedLocation && (
        <div className="selected-location-info">
          <h3>{selectedLocation.location}</h3>
          <div className="climbs-list">
            {/* Filter climbs based on selected location */}
            {climbs.filter(climb => climb.location === selectedLocation.location).map(filteredClimb => (
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
