const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    previousMarks: {
      type: Number,
      required: true,
    },
    updatedMarks: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Additional fields can be added as necessary
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
