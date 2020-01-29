const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../models/users");

router.post("/register", (req, res) => {
  const user = req.body;

  // hash the password
  const hash = bcrypt.hashSync(user.password, 14); // the 8 is the number of rounds (2^8) (iterations)

  // override the plain text password with the hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
