import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { isNonEmptyString } from "../utils/validators.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error." });
    }

    const admin = await Admin.findOne({ username });

    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Authentication failed." });
  }
});

export default router;
