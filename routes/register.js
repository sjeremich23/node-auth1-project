const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../models/users");

router.post("/", (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.user = saved;
      res.status(201).json({ saved });
    })
    .catch(err => {
      res
        .status(500)
        .json(`${err.code}, error: Cannot register user to database`);
    });
});

module.exports = router;
