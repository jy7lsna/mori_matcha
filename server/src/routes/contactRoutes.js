import express from "express";
import Contact from "../models/Contact.js";
import { isNonEmptyString, isValidEmail, sanitizeString } from "../utils/validators.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!isNonEmptyString(name) || !isValidEmail(email) || !isNonEmptyString(message)) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const contact = await Contact.create({
    name: sanitizeString(name),
    email: email.trim().toLowerCase(),
    message: sanitizeString(message)
  });

  return res.status(201).json(contact);
});

export default router;
