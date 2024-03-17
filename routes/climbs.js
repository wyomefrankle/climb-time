var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// Add a login functionality
router.post("/login", function(req, res, next) {
  const { user_id, password } = req.body;
  
  // Check if username and password are provided
  if (!user_id || !password) {
    res.status(400).send("Please enter a username and password");
    return;
  }

  // Query the database to check if the provided credentials are valid
  db(`SELECT * FROM users WHERE user_id = "${user_id}" AND password = "${password}";`)
    .then(results => {
      if (results.data.length === 0) {
        // If credentials are not valid, return a response with an error message
        res.status(401).send("Incorrect username or password");
      } else {
        // If valid, return a response with a success message or user data
        res.send(results.data[0]);
      }
    })
    .catch(err => {
      console.error("Error:", err); // Log any errors that occur
      res.status(500).send("Internal Server Error");
    });
});

// Add a new user
router.post("/create-user", function(req, res, next) {
  const { user_id, password, firstname, lastname } = req.body;
  
  // Check if all required fields are provided
  if (!user_id || !password || !firstname || !lastname) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  // Check if the user_id already exists in the database
  db(`SELECT * FROM users WHERE user_id = "${user_id}";`)
    .then(results => {
      if (results.data.length > 0) {
        // If user_id already exists, return an error response
        res.status(400).json({ error: "User ID already exists" });
      } else {
        // If user_id doesn't exist, proceed with inserting the new user
        return db(`INSERT INTO users (user_id, password, firstname, lastname) VALUES ("${user_id}", "${password}", "${firstname}", "${lastname}");`);
      }
    })
    .then(() => {
      // Return a success message upon successful insertion
      res.status(201).json({ message: "User created successfully" });
    })
    .catch(err => {
      console.error("Error:", err); // Log any errors that occur
      res.status(500).json({ error: "Internal Server Error" });
    });
});



/* GET climbs listing. */
router.get("/:user_id", function(req, res, next) {
  db(`SELECT * FROM climbs WHERE user_id = "${req.params.user_id}";`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one climb
router.get("/:user_id/:id", function(req, res, next) {
  db(`SELECT * FROM climbs where (id,user_id) = (${req.params.id}, "${req.params.user_id}") ORDER BY id ASC;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new climb into the DB
router.post("/:user_id", function(req, res, next) {
  console.log("Request Body:", req.body); // Log the request body to see what data is being sent from the frontend

  const {date, grade, location, feels_like, comment, style, tries } = req.body;
  const { user_id } = req.params; // Extract user ID from the URL params

  // Check if required fields are filled in
  if (!date || !grade || !location || !style || !user_id) {
    res.status(400).send("Please fill in all required fields.");
    return;
  }

  // Convert date to ISO 8601 format and extract date part
  const isoDate = new Date(date).toISOString().split('T')[0];

  // Check if 'date' is a valid date
  if (isNaN(new Date(isoDate).getTime())) {
    res.status(400).send("Invalid date format.");
    return;
  }

  db(
    `INSERT INTO climbs (date, grade, location, feels_like, comment, style, tries, user_id) VALUES ("${isoDate}", "${grade}", "${location}", "${feels_like}", "${comment}", "${style}", ${tries}, "${user_id}")`
  )
    .then(() => db(`SELECT * FROM climbs WHERE user_id = "${user_id}" ORDER BY id ASC;`))
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.error("Error:", err); // Log any errors that occur
      res.status(500).send(err);
    });
});

// DELETE a climb from the DB
router.delete("/:user_id/:id", function(req, res, next) {
  // Ensure user_id and id are properly sanitized
  if (!req.params.user_id || !req.params.id || isNaN(req.params.id)) {
    res.status(400).send({ error: "Invalid parameters" });
    return;
  }

  db(`DELETE FROM climbs WHERE id = ${req.params.id} AND user_id = "${req.params.user_id}";`)
    .then(deleted => {
      if (deleted.affectedRows === 0) {
        // If no climb was deleted, send a 404 status and message
        res.status(404).send({ message: "Climb not found" });
        return;
      }

      // Fetch climbs after deletion
      return db(`SELECT * FROM climbs WHERE user_id = "${req.params.user_id}" ORDER BY id ASC;`);
    })
    .then(results => {
      // Send the updated climbs list
      res.send(results.data);
    })
    .catch(err => {
      // If there's an error, send a 500 status and error message
      console.error("Error:", err);
      res.status(500).send({ error: "Internal Server Error" });
    });
});




module.exports = router;
