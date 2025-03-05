import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // URL to university image
  website: { type: String, required: true }, // University official website
  minZScore: { type: Number, required: true }, // Minimum required Z-score
  faculty: { type: String, required: true }, // Faculty Name
  degree: { type: String, required: true } // Degree Program
});

const University = mongoose.model("University", universitySchema);
export default University;
