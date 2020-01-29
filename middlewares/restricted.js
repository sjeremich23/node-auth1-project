module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    next();
  } else {
    res.status(401).json({ message: "you shall not pass!!" });
  }
};
