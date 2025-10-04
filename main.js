const express = require('express')
const mongoose = require('mongoose');
const Student = require('./Models/student.js');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOURL+'studentDB');

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
  const students = await Student.find();
  res.json(students);
});

app.put("/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
