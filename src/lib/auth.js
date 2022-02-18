const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

function generateAccessToken(user) {
  // expires in cca 24 hours
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "160000s" });
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 5;
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  validateEmail,
  validatePassword,
};
