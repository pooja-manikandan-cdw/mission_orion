const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
});

const users = mongoose.model("users", userSchema);

module.exports = users;
