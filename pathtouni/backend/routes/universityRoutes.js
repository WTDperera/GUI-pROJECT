import express from "express";
import { getUniversities, searchUniversities, addUniversity } from "../controllers/universityController.js";

const router = express.Router();

router.get("/", getUniversities);
router.get("/search", searchUniversities);
router.post("/", addUniversity); // Later, add authentication middleware for admin-only access

export default router;
