const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowowercase: true },
    rollno: { type: Number, required: true },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("Student", studentSchema);
