const router = require("express").Router();

const restricted = require("../middlewares/restricted");

router.get("/something", restricted, (req, res) => {
  res.send("something");
});
router.get("/other", restricted, (req, res) => {
  res.send("other");
});
router.get("/a", restricted, (req, res) => {
  res.send("a");
});

module.exports = router;
