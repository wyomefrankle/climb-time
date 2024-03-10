import { useEffect, useState } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CLIMB_INITIAL_STATE = {
  date: new Date(),
  grade: "3",
  location:"",
  feels_like: "3",
  comment:"",
  style:"",
  tries:""
};

const gradeOptions = [
  "3",
  "4",
  "5A/B",
  "5B/C",
  "5C/6A",
  "6A/B",
  "6B/7A",
  "7A >",
  "Comp"
];

function App() {  
  const [climbs, setClimbs] = useState([]);
  const [newClimb, setNewClimb] = useState(CLIMB_INITIAL_STATE);
  const styleOptions = ["Flash", "Redpoint", "Go"];

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

  const handleDateChange = (date) => {
    setNewClimb((prevState) => ({ ...prevState, date: date.toISOString().split('T')[0] }));
  };

  const handleGradeChange = (event) => {
    const { value } = event.target;
    setNewClimb((prevState) => ({ ...prevState, grade: value }));
  };
  const handleFeelsLikeChange = (event) => {
    const { value } = event.target;
    setNewClimb((prevState) => ({ ...prevState, feels_like: value }));
  };

  const handleStyleChange = (event) => {
    const { value } = event.target;
    setNewClimb((prevState) => ({ ...prevState, style: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addClimbs();
  };

  const addClimbs = () => {
      // Check if required fields are filled in
    if (!newClimb.grade || !newClimb.location || !newClimb.style) {
      console.error("Please fill in all required fields.");
      return;
    }

    // Convert 'tries' to an integer
    const triesInt = parseInt(newClimb.tries);

    // Convert date to ISO 8601 format
    const newDate = new Date(newClimb.date).toISOString().split('T')[0];

    // Update newClimb with the integer value of tries and converted date
    setNewClimb(prevState => ({ ...prevState, tries: triesInt, date: newDate }));
    
    console.log("New Climb Data:", newClimb); // Log the new climb data before sending the request
    fetch("/api/climbs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newClimb)
    })
      .then(result => {
        if (!result.ok) {
          throw new Error("Failed to add climb");
        }
        return result.json();
      })
      .then(json => {
        console.log("Response Data:", json); // Log the response data after receiving the response
        setClimbs(json);
        setNewClimb(CLIMB_INITIAL_STATE);
      })
      .catch(error => {
        console.error("Error adding climb:", error.message);
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
      <label className="label">
          Grade:
          <select
            value={newClimb.grade}
            onChange={handleGradeChange}
            className="input"
          >
            {gradeOptions.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>
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
          <select
            value={newClimb.feels_like}
            onChange={handleFeelsLikeChange}
            className="input"
          >
            {gradeOptions.map((feels_like, index) => (
              <option key={index} value={feels_like}>
                {feels_like}
              </option>
            ))}
          </select>
        </label>}
        {<label className="label">
          Date:
          <DatePicker
            selected={new Date(newClimb.date)} // Pass the selected date
            onChange={date => handleDateChange(date)} // Handle date change
            className="input" // Apply your existing input styling
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
        <div className="label">
          Style:
          {styleOptions.map((style, index) => (
            <label key={index} className="radio-label">
              <input
                type="radio"
                value={style}
                checked={newClimb.style === style}
                onChange={handleStyleChange}
              />
              {style}
            </label>
          ))}
        </div>
        {<label className="label">
          Tries:
          <input
            type="number"
            onChange={e => handleInputChange(e)}
            value={newClimb.tries}
            name="tries"
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
            <li>Location: {climb.location}</li>
            <li>Date: {new Date(climb.date).toLocaleDateString()}</li>
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
            <li>Style: {climb.style}</li>
            <li>Tries: {climb.tries}</li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
