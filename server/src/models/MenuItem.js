import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    category: { type: String, default: "" },
    isSeasonal: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
