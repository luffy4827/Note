const jwt = require("jsonwebtoken");
require("dotenv").config();

// Environment variable for the JWT secret
const secretKey = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = isAuthenticated;
