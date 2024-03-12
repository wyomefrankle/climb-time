import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InputForm({handleSubmit, handleGradeChange, gradeOptions, handleInputChange, newClimb, handleFeelsLikeChange, handleDateChange, handleStyleChange, styleOptions}) {

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
          {newClimb.style != "Flash" ? (
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
          ) : null}
          {<button type="submit" className="submit-button">
            Submit
          </button>}
        </form>
    </div>
)
}

export default InputForm;
