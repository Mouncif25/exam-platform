// server/models/Exam.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audience: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model('Exam', examSchema);
