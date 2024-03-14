import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectedLocationInfo from "./components/SelectedLocationInfo.jsx";
import InputForm from "./components/InputForm.jsx";
import { useEffect, useState } from "react";


function App() {
  const [climbs, setClimbs] = useState([]);

  useEffect(() => {
    getClimbs();
  }, []);

  const getClimbs = () => {
    fetch(`/api/climbs/wyomefrankle`)
      .then((response) => response.json())
      .then((climbs) => {
        setClimbs(climbs);
      })
      .catch((error) => {
        console.error("Error fetching climbs:", error);
      });
  };

  return (
    <div className="App">
      <h1 className="title">My Climbing Log</h1>
      <h3 className="subheading"> Add new Climb: </h3>
      <InputForm climbs={climbs} getClimbs={getClimbs} /> {/* Pass props */}

      <SelectedLocationInfo climbs={climbs} setClimbs={getClimbs} />
    </div>
  );
}

export default App;
