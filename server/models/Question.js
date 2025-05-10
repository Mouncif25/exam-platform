const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId: { type: String, required: true },
  type: { type: String, enum: ["qcm", "direct"], required: true },
  text: { type: String, required: true },
  options: [String], // only for QCM
  answer: { type: String, required: true },
  points: { type: Number, required: true },
  time: { type: Number, required: true }, // in seconds
});

module.exports = mongoose.model("Question", questionSchema);
