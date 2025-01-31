const router = require("express").Router();
const {
  signup,
  login,
  getUserProfile,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// profile route
router.get("/profile", getUserProfile);

module.exports = router;
