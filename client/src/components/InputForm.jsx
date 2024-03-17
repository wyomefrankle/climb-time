import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InputForm({getClimbs}) {
    const CLIMB_INITIAL_STATE = {
        date: new Date(),
        grade: "3",
        location:"",
        feels_like: "3",
        comment:"",
        style:"",
        tries:0
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

      const [newClimb, setNewClimb] = useState(CLIMB_INITIAL_STATE);
      const styleOptions = ["Flash", "Redpoint", "Go"];
    

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
        addClimb();
      };
    
      const addClimb = (user_id) => {
          // Check if required fields are filled in
        if (!newClimb.grade || !newClimb.location || !newClimb.style) {
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
            getClimbs();
            setNewClimb(CLIMB_INITIAL_STATE);
          })
          .catch(error => {
            console.error("Error adding climb:", error.message);
          });
      };
    
return(
    <div>
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
          {newClimb.style !== "Flash" && (
            <label className="label">
                Tries:
                <input
                type="number"
                onChange={handleInputChange}
                value={newClimb.tries}
                name="tries"
                className="input"
                />
            </label>
            )}
          {<button type="submit" className="submit-button">
            Submit
          </button>}
        </form>
    </div>
)
}

export default InputForm;
