// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  institution: { type: String, required: true },
  major: { type: String, required: true },
  role: { type: String, required: true }, // student or teacher
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
