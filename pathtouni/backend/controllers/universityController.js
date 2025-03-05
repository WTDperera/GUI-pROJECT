import University from "../models/University.js";

// @desc   Get all universities
// @route  GET /api/universities
// @access Public
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc   Search universities by name
// @route  GET /api/universities/search
// @access Public
export const searchUniversities = async (req, res) => {
  try {
    const { query } = req.query;
    const universities = await University.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc   Add a new university (Admin use only)
// @route  POST /api/universities
// @access Private (Admin)
export const addUniversity = async (req, res) => {
  try {
    const { name, image, website, minZScore, faculty, degree } = req.body;
    const newUniversity = new University({ name, image, website, minZScore, faculty, degree });

    await newUniversity.save();
    res.status(201).json({ message: "University added successfully", university: newUniversity });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
