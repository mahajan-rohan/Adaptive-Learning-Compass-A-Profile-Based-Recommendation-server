import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String, required: true },
  color: { type: String, required: true },
  marksObtained: { type: Number },
  totalMarks: { type: Number },
  previousMarks: { type: Number },
  updatedMarks: { type: Number },
  semester: { type: String },
  studyHours: { type: Number },
  isCodingSubject: { type: Boolean, default: false },
  attendance: { type: Number },
  projectsBuilt: { type: Number },
  codingContestsAttempted: { type: Number },
});

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    type: { type: Boolean }, // isStudent
    name: { type: String },
    email: { type: String },
    studentId: {
      type: String,
    },
    major: {
      type: String,
    },
    year: {
      type: String,
    },
    semester: { type: String, required: true },
    bio: { type: String },
    subjects: [courseSchema], // Array of courses
    yearsOfExperience: {
      type: Number,
    },
    certifications: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
