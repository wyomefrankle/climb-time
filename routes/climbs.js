var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// Add a login functionality
router.post("/login", function(req, res, next) {
  const { username, password } = req.body;
  
  // Check if username and password are provided
  if (!username || !password) {
    res.status(400).send("Please enter a username and password");
    return;
  }

  // Query the database to check if the provided credentials are valid
  db(`SELECT * FROM users WHERE user_id = "${username}" AND password = "${password}";`)
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

//Add a new user
router.post("/users", function(req, res, next) {
  const { user_id, password, firstname, lastname } = req.body;
  
  // Check if all required fields are provided
  if (!user_id || !password || !firstname || !lastname) {
    res.status(400).send("All fields are required");
    return;
  }

  // Query the database to insert the new user
  db(`INSERT INTO users (user_id, password, firstname, lastname) VALUES ("${user_id}", "${password}", "${firstname}", "${lastname}");`)
    .then(() => {
      // Return a success message upon successful insertion
      res.status(201).send("User created successfully");
    })
    .catch(err => {
      console.error("Error:", err); // Log any errors that occur
      res.status(500).send("Internal Server Error");
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
  if (!date || !grade || !location || !style || !tries || !user_id) {
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
  db(`SELECT * FROM climbs where id = ${req.params.id} AND user_id = "${req.params.user_id}";`)
    .then(climb => {
      if (!climb.data.length) {
        res.status(404).send({ message: "Climb not found" });
        return;
      }

      return db(`DELETE FROM climbs WHERE id = ${req.params.id};`);
    })
    .then(() => db(`SELECT * FROM climbs ORDER BY id ASC;`))
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err)); //send 500 error message if there is an error
});

module.exports = router;
