const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// ✅ Middleware first
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/exam-platform")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Routes
const authRoutes = require("./routes/auth");
app.use('/', authRoutes); // now /register works

const examRoutes = require("./routes/exams");
app.use("/exams", examRoutes);

// ✅ Start the server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
