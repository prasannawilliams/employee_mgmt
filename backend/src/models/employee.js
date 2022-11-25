const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    default: null,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
  photo: {
    type: String,
    required: false,
    default: null,
  },
  date_of_birth: {
    type: Date,
  },
});

module.exports = mongoose.model("employees", employeeModel);
