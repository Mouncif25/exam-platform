// server/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST /register
router.post("/register", async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      dob,
      gender,
      institution,
      major,
      role,
      password,
    } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fname,
      lname,
      email,
      dob,
      gender,
      institution,
      major,
      role,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "✅ Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ✅ POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    res.json({ 
      message: `✅ Welcome back, ${user.fname}`,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
