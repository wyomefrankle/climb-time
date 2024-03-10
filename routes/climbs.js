var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET climbs listing. */
router.get("/", function(req, res, next) {
  db("SELECT * FROM climbs;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one climb
router.get("/:id", function(req, res, next) {
  db(`SELECT * FROM climbs where id = ${req.params.id} ORDER BY id ASC;`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new climb into the DB
router.post("/", function(req, res, next) {
  console.log("Request Body:", req.body); // Log the request body to see what data is being sent from the frontend

  const { date, grade, location, feels_like, comment, style, tries } = req.body;

  // Check if required fields are filled in
  if (!date || !grade || !location || !style || !tries) {
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
    `INSERT INTO climbs (date, grade, location, feels_like, comment, style, tries) VALUES ("${isoDate}", "${grade}", "${location}", "${feels_like}", "${comment}", "${style}", ${tries})`
  )
    .then(() => db("SELECT * FROM climbs ORDER BY id ASC;"))
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.error("Error:", err); // Log any errors that occur
      res.status(500).send(err);
    });
});

// DELETE a climb from the DB
router.delete("/:id", function(req, res, next) {
  db(`SELECT * FROM climbs where id = ${req.params.id};`)
    .then(climb => {
      if (!climb.data.length) {
        res.status(404).send({ message: "Climb not found" });
        return;
      }

      return db(`DELETE FROM climbs WHERE id = ${req.params.id};`);
    })
    .then(() => db("SELECT * FROM climbs ORDER BY id ASC;"))
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err)); //send 500 error message if there is an error
});

module.exports = router;
