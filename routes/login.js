const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // check that the password

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // in here with .compare()
        // change the users-model findBy() to return the password as well
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
