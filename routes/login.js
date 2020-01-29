const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res
          .status(200)
          .json({ message: `Logged in: Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json(`${err.code}, error: Cannot login user from database`);
    });
});

module.exports = router;
