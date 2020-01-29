const router = require("express").Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({
    Server: "Hi, I'm your Server.  Can I start you off with a drink?"
  });
});

module.exports = router;
