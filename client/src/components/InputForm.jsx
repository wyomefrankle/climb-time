import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom"; 
import "../App.css";

function InputForm({ getClimbs, newClimbLocation }) {
    const { user_id } = useParams();
    const CLIMB_INITIAL_STATE = {
        date: new Date(),
        grade: "3",
        location:"",
        lat:52.38,
        lng: 4.64,
        feels_like: "3",
        comment:"",
        style:"",
        tries:0
      };

      const [newClimb, setNewClimb] = useState(CLIMB_INITIAL_STATE);
      const styleOptions = ["Flash", "Redpoint", "Go"];
      const [showForm, setShowForm] = useState(false);

      useEffect(() => {
        if (newClimbLocation) {
          // Update the newClimb state with the clicked location's latitude and longitude values
          setNewClimb(prevState => ({
            ...prevState,
            lat: newClimbLocation.lat,
            lng: newClimbLocation.lng
          }));
        }
      }, [newClimbLocation]);


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
        addClimb(user_id);
      };
    
      const addClimb = (user_id) => {
          // Check if required fields are filled in
        if (!newClimb.grade || !newClimb.location || !newClimb.style || !newClimb.lat || !newClimb.lng) {
          console.error("Please fill in all required fields.");
          return;
        }

        // If style is "Flash", set tries to null
        let triesInt = null;
        if (newClimb.style !== "Flash") {
            // Convert 'tries' to an integer if it exists
            triesInt = newClimb.tries !== "" ? parseInt(newClimb.tries) : null;
        }
    
        // Convert date to ISO 8601 format
        const newDate = new Date(newClimb.date).toISOString().split('T')[0];
    
        // Update newClimb with the integer value of tries and converted date
        setNewClimb(prevState => ({ ...prevState, tries: triesInt, date: newDate }));
        
        console.log("New Climb Data:", newClimb); // Log the new climb data before sending the request
        fetch(`/api/climbs/${user_id}`, {
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
            getClimbs(user_id);
            setNewClimb(CLIMB_INITIAL_STATE);
            setShowForm(false); // Hide the form after submitting
          })
          .catch(error => {
            console.error("Error adding climb:", error.message);
          });
      };



return(
  <div>
  {!showForm && (
        <button onClick={() => setShowForm(true)} className='btn'>Add New Climb</button>
          )}
        {showForm && (
          <div className="App">
            <h1>Add New Climb</h1>
            <form onSubmit={e => handleSubmit(e)} className="form">
          <div className="form-group">
              <label className="form-label">Grade:</label>
              <select className="form-control" value={newClimb.grade} onChange={handleGradeChange} style={{ width: '40%' }}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5A/B">5A/5B</option>
                  <option value="5B/C">5B/C</option>
                  <option value="6A/B">6A/B</option>
                  <option value="7A">7A</option>
                  <option value="Comp">Comp</option>
              </select>
          </div>
          <div className="form-group">
              <label className="form-label">Location:</label>
              <input
                  onChange={e => handleInputChange(e)}
                  value={newClimb.location}
                  name="location"
                  className="form-control"
                  style={{ width: '40%' }}
              />
          </div>
          {/* Include latitude and longitude inputs */}
          <div className="form-group">
              <label className="form-label">Latitude:</label>
              <input
                  onChange={e => handleInputChange(e)}
                  value={newClimb.lat}
                  name="lat"
                  className="form-control"
                  style={{ width: '40%' }}
              />
          </div>
          <div className="form-group">
              <label className="form-label">Longitude:</label>
              <input
                  onChange={e => handleInputChange(e)}
                  value={newClimb.lng}
                  name="lng"
                  className="form-control"
                  style={{ width: '40%' }}
              />
          </div>
          <div className="form-group">
              <label className="form-label">What grade it felt like:</label>
              <select className="form-control" value={newClimb.feels_like} onChange={handleFeelsLikeChange} style={{ width: '40%' }}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5A/B">5A/5B</option>
                  <option value="5B/C">5B/5C</option>
                  <option value="6A/B">6A/B</option>
                  <option value="7A">7A</option>
                  <option value="Comp">Comp</option>
              </select>
          </div>
          <div className="form-group">
              <label className="form-label">Date:</label>
              <DatePicker
                  selected={new Date(newClimb.date)} // Pass the selected date
                  onChange={date => handleDateChange(date)} // Handle date change
                  className="form-control"
                  style={{ width: '40%' }}
                  />
                  </div>
                    <div className="form-group">
                        <label className="form-label">Additional notes:</label>
                        <input
                            onChange={e => handleInputChange(e)}
                            value={newClimb.comment}
                            name="comment"
                            className="form-control"
                            style={{ width: '40%' }}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Style:</label>
                        {styleOptions.map((style, index) => (
                            <div key={index} className="form-check">
                                <input
                                    type="radio"
                                    value={style}
                                    className="form-check-input"
                                    checked={newClimb.style === style}
                                    onChange={handleStyleChange}
                                />
                                {style}
                            </div>
                        ))}
                    </div>
                    {/* Only show tries input if style is not "Flash" */}
                    {newClimb.style !== "Flash" && (
                        <div className="form-group">
                            <label className="form-label">Tries:</label>
                            <input
                                type="number"
                                onChange={handleInputChange}
                                value={newClimb.tries}
                                name="tries"
                                className="form-control"
                                style={{ width: '40%' }}
                            />
                        </div>
                    )}
                    <br/>
                    <button type="submit" className="btn">
                        Add Climb
                    </button>
                </form>
          </div>
        )}
        </div>
)
}

InputForm.propTypes = {
  getClimbs: PropTypes.func.isRequired,
};

export default InputForm;
