const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  email: String,
  name: String,
  role: String,
  gender: String,
  profilePicture: String,
  profileBio: String,
  destination: String,
  certifications: [String],
  experience: Number,
  bu: String,
  location: String,
  approvalStatus: String,
  password: String,
  timestamp: { type: Date, default: Date.now },
});

const employees = mongoose.model("employees", employeeSchema);

module.exports = employees;
