const mongoose = require('mongoose');

const StdSchema = new mongoose.Schema({
  name: String,
  id: String,
  department: String,
  year: String,
  dob: String,
  fatherName: String,
  motherName: String,
  gender: String,
  email: String,
  phone: String,
  address: String
})

const Student = mongoose.model('Students', StdSchema);

module.exports = Student;