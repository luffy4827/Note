const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Environment variable for the JWT secret
const secretKey = process.env.JWT_SECRET;

// Signup Controller
const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "SignUp Successful" });
  } catch (error) {
    console.error("Error creating a user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      const { password, ...userWithoutPassword } = existingUser.toObject();
      // Generate JWT
      const token = jwt.sign(
        { username, userId: existingUser._id },
        secretKey,
        { expiresIn: "2d" }
      );
      res.cookie("token", token, {
        // httpOnly: true,
        secure: "production",
        sameSite: "Strict",
        maxAge: 48 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ id: existingUser._id, token, user: userWithoutPassword });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  const token = req.cookies.token; // Access the token from cookies

  if (!token) {
    return res.status(401).json({ message: "No token available" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.username;

    // Fetch user details from the database
    const user = await UserModel.findOne({ username: userId }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, getUserProfile };
