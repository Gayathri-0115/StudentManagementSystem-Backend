const express = require("express");
const mongoose = require("mongoose");
const Student = require("./Models/student.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

//  Use Render's PORT or fallback to 3000 locally
const port = process.env.PORT || 3000;

//  Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://student-management-system-0106.netlify.app", // your Netlify URL (NO trailing slash)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//  MongoDB connection
mongoose
  .connect(process.env.MONGOURL + "studentDB")
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

//  Routes
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
