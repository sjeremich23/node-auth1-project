const router = require("express").Router();

const Users = require("../models/users");
const restricted = require("../middlewares/restricted");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
