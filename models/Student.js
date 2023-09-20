const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  droits: { type: Array, required: false },
})

module.exports = mongoose.model("Student", studentSchema)
