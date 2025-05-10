const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Exam = require("../models/Exam"); // ✅ import model
const Question = require("../models/Question");
// POST /exams/create
router.post("/create", async (req, res) => {
  const { title, description, audience } = req.body;

  if (!title || !description || !audience) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const link = `http://localhost:3000/exams/${uuidv4()}`;

  try {
    const newExam = new Exam({ title, description, audience, link });
    await newExam.save();

    res.status(201).json({ message: "✅ Exam saved to database", link });
  } catch (err) {
    console.error("Error saving exam:", err);
    res.status(500).json({ message: "❌ Server error saving exam" });
  }
});

router.post("/:id/questions", async (req, res) => {
  const examId = req.params.id;
  const { type, text, options, answer, points, time } = req.body;

  if (!type || !text || !answer || !points || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const question = new Question({
      examId,
      type,
      text,
      options: type === "qcm" ? options : [],
      answer,
      points,
      time,
    });

    await question.save();
    res.status(201).json({ message: "✅ Question added successfully" });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

router.get("/:id/questions", async (req, res) => {
  const examId = req.params.id;

  try {
    const questions = await Question.find({ examId });
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "❌ Could not load questions" });
  }
});

module.exports = router;
