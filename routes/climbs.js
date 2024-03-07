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
  const grade = req.body.grade;
  const location = req.body.location;
  const feels_like = req.body.feels_like;
  const comment = req.body.comment;
  const status = req.body.status;
  const name = req.body.name;

  db(
    `INSERT INTO climbs (grade, location, feels_like, comment, status, name) VALUES (${grade}, ${location}, ${feels_like}, ${comment}, ${status}, ${name})`
  )
    .then(() => db("SELECT * FROM climbs ORDER BY id ASC;"))
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
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
