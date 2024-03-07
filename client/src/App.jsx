import { useEffect, useState } from "react";
import "./App.css";

const CLIMB_INITIAL_STATE = {
  grade: " ",
  location:" ",
  feels_like: " ",
  comment:"",
  status:0,
  name:""
};

function App() {  
  const [climbs, setClimbs] = useState([]);
  const [newClimb, setNewClimb] = useState(CLIMB_INITIAL_STATE);
  // let [lastName, setLastName] = useState("");

  useEffect(() => {
    getClimbs();
  }, []);

  const getClimbs = () => {
    fetch("/api/climbs")
      .then(response => response.json())
      .then(climbs => {
        setClimbs(climbs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClimb((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addClimbs();
  };

  const addClimbs = () => {
    fetch("/api/climbs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({newClimb})
    })
      .then(result => {
        if (!result.ok) {
          throw new Error("Failed to add climb");
        }
        return result.json();
      })
      .then(json => {
        setClimbs(json);
        setNewClimb("");
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const deleteStudent = id => {
  //   fetch(`/api/students/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(result => {
  //       if (!result.ok) {
  //         throw new Error("Failed to delete student");
  //       }
  //       return result.json();
  //     })
  //     .then(json => {
  //       setStudents(json);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="App">
      <h1 className="title">My Climbing Log</h1>
      <h3 className="subheading"> Add new Climb: </h3>
      <form onSubmit={e => handleSubmit(e)} className="form">
        {<label className="label">
          Grade:
          <input
            onChange={e => handleInputChange(e)}
            value={newClimb.grade}
            name="grade"
            className="input"
          />
        </label>}
        {<label className="label">
          Location:
          <input
            onChange={e => handleInputChange(e)}
            value={newClimb.location}
            name="location"
            className="input"
          />
        </label>}
        {<label className="label">
          What grade it felt like:
          <input
            onChange={e => handleInputChange(e)}
            value={newClimb.feels_like}
            name="feels_like"
            className="input"
          />
        </label>}
        {<label className="label">
          Gym name:
          <input
            onChange={e => handleInputChange(e)}
            value={newClimb.name}
            name="name"
            className="input"
          />
        </label>}
        {<label className="label">
          Additional notes:
          <input
            onChange={e => handleInputChange(e)}
            value={newClimb.comment}
            name="comment"
            className="input"
          />
        </label>}
        {<button type="submit" className="submit-button">
          Submit
        </button>}
      </form>
      <div className="climbs-list">
        {climbs.map(climb => (
          <div key={climb.id} className="climb">
            <li>Gym: {climb.name}</li>
            <li>How the grade really felt: {climb.feels_like}</li>
            <li>
              Grade: {climb.grade}
              {/* <button
                onClick={() => deleteStudent(climb.id)}
                className="delete-button"
              >
                {" "}
                Delete{" "}
              </button> */}
            </li>
            <li>What grade it felt like: {climb.feels_like}</li>
            <li>Additional notes: {climb.comment}</li>
            <li>Location: {climb.location}</li>
            <li>Status: {climb.status}</li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
