import "../App.css";
import {useMapEvents } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";


// This component will receive props for the selected location data and the delete function.
function LocationMarkers({ setNewClimbLocation }) {

    const map = useMapEvents({
      click(e) {
        const lat = e.latlng.lat
        const lng = e.latlng.lng
        setNewClimbLocation({ lat, lng }); // Pass the clicked location back to the parent component
    }
    });
  
    return null; 

  }
  

export default LocationMarkers;
