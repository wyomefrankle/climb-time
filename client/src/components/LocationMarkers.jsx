import "../App.css";
import React from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";


// This component will receive props for the selected location data and the delete function.
function LocationMarkers({ setNewClimbLocation }) {
  
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setNewClimbLocation({ lat, lng }); // Pass the clicked location back to the parent component
      }
    });
  
    return null; 

  }
  

export default LocationMarkers;
