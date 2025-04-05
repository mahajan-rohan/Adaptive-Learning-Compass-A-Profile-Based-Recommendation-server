import User from "../models/User.js";

export const saveUserData = async (req, res) => {
  try {
    const clerkId = req.auth.userId; // Clerk user ID from middleware
    const {
      userName,
      semester,
      type,
      subjects,
      yearsOfExperience,
      certifications,
      email,
    } = req.body;

    console.log({ clerkId, userName, semester, type, subjects, email });

    if (!userName || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({
        clerkId,
        userName,
        semester,
        subjects,
        type,
        email,
        yearsOfExperience,
        certifications,
      });
    } else {
      // user.semester = semester;
      user.subjects = [...user.subjects, ...subjects];
    }

    await user.save();
    res.status(200).json({ message: "User data saved successfully", user });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserData = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    console.log({ clerkId });

    const user = await User.findOne({ clerkId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSubjectInfo = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { subject } = req.body;

    console.log({ clerkId, subject });

    if (!subject || !subject.title) {
      return res.status(400).json({ message: "Invalid subject data" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subjectIndex = user.subjects.findIndex(
      (sub) => sub.title === subject.title
    );

    if (subjectIndex === -1) {
      return res.status(404).json({ message: "Subject not found" });
    }

    user.subjects[subjectIndex] = subject;

    await user.save();
    res
      .status(200)
      .json({ message: "Subject info updated successfully", user });
  } catch (error) {
    console.error("Error updating subject info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const clerkId = req.auth.userId; // Clerk user ID from middleware
    const {
      userName,
      type,
      name,
      email,
      studentId,
      major,
      year,
      bio,
      subjects,
      yearsOfExperience,
      certifications,
    } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.userName = userName || user.userName;
    user.type = type !== undefined ? type : user.type;
    user.name = name || user.name;
    user.email = email || user.email;
    user.studentId = studentId || user.studentId;
    user.major = major || user.major;
    user.year = year || user.year;
    user.bio = bio || user.bio;
    user.subjects = subjects || user.subjects;
    user.yearsOfExperience = yearsOfExperience || user.yearsOfExperience;
    user.certifications = certifications || user.certifications;

    await user.save();
    res.status(200).json({ message: "User info updated successfully", user });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
