const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users");
const restricted = require("../../middlewares/restricted");

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
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

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ err });
      } else {
        res.json({ message: "You can checkout but you can't leave" }).end();
      }
    });
  }
});

module.exports = router;
