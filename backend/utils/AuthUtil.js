const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = ({ userName, email }) => {
  return jwt.sign({ user: userName, email }, process.env.TOKEN_KEY, {
    expiresIn: "30min",
  });
};
