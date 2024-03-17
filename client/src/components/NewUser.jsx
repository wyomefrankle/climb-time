import React, { useState } from 'react';

function NewUser() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleCreateAccount = () => {
    // send user data to the server for account creation
    fetch(`/api/climbs/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id, password, firstname, lastname }) // Send user data to the server
    })
      .then(result => {
        // Handle the response from the server as needed
        if (!result.ok) {
          throw new Error("Error creating user account");
        }
        return result.json();
      })
      .then(json => {
        // Handle the success response from the server, e.g., show a success message
        console.log("User account created successfully:", json);
      })
      .catch(error => {
        // Handle errors, e.g., show an error message to the user
        console.error("Error creating user account:", error.message);
      });
  };

  return (
    <div>
      <h1>Create New User Account</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleCreateAccount}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default NewUser;
