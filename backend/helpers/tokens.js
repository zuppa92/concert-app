// backend/helpers/tokens.js
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// Generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { generateToken };