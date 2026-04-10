import express from "express";
import MenuItem from "../models/MenuItem.js";
import { isNonEmptyString, isPositiveNumber, sanitizeString, isValidImageUrl } from "../utils/validators.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await MenuItem.find().sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", requireAuth, async (req, res) => {
  const { name, price, description, image, category, isSeasonal } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(description) || !isPositiveNumber(price)) {
    return res.status(400).json({ message: "Name, price, and description are required." });
  }

  if (!isValidImageUrl(image)) {
    return res.status(400).json({ message: "Invalid image URL." });
  }

  const item = await MenuItem.create({
    name: sanitizeString(name),
    price,
    description: sanitizeString(description),
    image: sanitizeString(image),
    category: sanitizeString(category),
    isSeasonal: Boolean(isSeasonal)
  });

  return res.status(201).json(item);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, category, isSeasonal } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(description) || !isPositiveNumber(price)) {
    return res.status(400).json({ message: "Name, price, and description are required." });
  }

  if (!isValidImageUrl(image)) {
    return res.status(400).json({ message: "Invalid image URL." });
  }

  const updated = await MenuItem.findByIdAndUpdate(
    id,
    {
      name: sanitizeString(name),
      price,
      description: sanitizeString(description),
      image: sanitizeString(image),
      category: sanitizeString(category),
      isSeasonal: Boolean(isSeasonal)
    },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Menu item not found." });
  }

  return res.json(updated);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const deleted = await MenuItem.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Menu item not found." });
  }

  return res.json({ message: "Menu item deleted." });
});

export default router;
