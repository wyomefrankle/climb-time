import React from 'react';

// This component will receive props for the selected location data and the delete function.
function SelectedLocationInfo({ selectedLocation, deleteClimb, climbs, handleLocationClick }) {
  return (
    <div className="location-section">
      <h3 className="subheading">Locations:</h3>
      <ul className="locations-list">
        {climbs.map(climb => (
          <li key={climb.id} onClick={() => handleLocationClick(climb)}>{climb.location}</li>
        ))}
      </ul>

      {selectedLocation && (
        <div className="selected-location-info">
          <h3>{selectedLocation.location}</h3>
          <div className="climbs-list">
            <div key={selectedLocation.id} className="climb-container">
              <div className="climb">
                <li>Location: {selectedLocation.location}</li>
                <li>Date: {new Date(selectedLocation.date).toLocaleDateString()}</li>
                <li>Grade: {selectedLocation.grade}</li>
                <li>What grade it felt like: {selectedLocation.feels_like}</li>
                <li>Additional notes: {selectedLocation.comment}</li>
                <li>Style: {selectedLocation.style}</li>
                <li>Tries: {selectedLocation.tries}</li>
              </div>
              <button
                onClick={() => deleteClimb(selectedLocation.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedLocationInfo;
