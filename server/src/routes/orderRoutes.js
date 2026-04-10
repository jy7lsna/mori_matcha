import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import { isNonEmptyString, isPositiveNumber, isValidEmail } from "../utils/validators.js";
import requireAuth from "../middleware/auth.js";
import { sendReceiptEmail, sendStatusUpdateEmail } from "../utils/mailer.js";

const router = express.Router();

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }

  return items.every((item) => {
    if (!item) {
      return false;
    }

    const hasName = isNonEmptyString(item.name);
    const hasQuantity = Number.isFinite(item.quantity) && item.quantity > 0;
    const hasPrice = isPositiveNumber(item.price);

    return hasName && hasQuantity && hasPrice;
  });
};

router.post("/", async (req, res) => {
  const { items, totalPrice, customerName, customerEmail, notes } = req.body;

  if (!isValidItems(items) || !isPositiveNumber(totalPrice)) {
    return res.status(400).json({ message: "Order items and total price are required." });
  }

  if (isNonEmptyString(customerEmail) && !isValidEmail(customerEmail)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  // Server-side validation: calculate total from items
  const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Allow small floating point differences (within 1 cent)
  if (Math.abs(calculatedTotal - totalPrice) > 0.01) {
    return res.status(400).json({ message: "Order total does not match items." });
  }

  const order = await Order.create({
    items,
    totalPrice: calculatedTotal, // Use server-calculated total
    customerName: isNonEmptyString(customerName) ? customerName.trim() : "",
    customerEmail: isNonEmptyString(customerEmail) ? customerEmail.trim() : "",
    notes: isNonEmptyString(notes) ? notes.trim() : ""
  });

  if (order.customerEmail) {
    try {
      await sendReceiptEmail({ to: order.customerEmail, order });
    } catch (error) {
      console.error("Receipt email failed", error);
    }
  }

  return res.status(201).json(order);
});

router.get("/:id", async (req, res) => {
  // Validate Order ID format
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ 
      message: "Invalid order ID format. Order IDs should be 24 characters long." 
    });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving order." });
  }
});

router.get("/", requireAuth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return res.json(orders);
});

router.patch("/:id/status", requireAuth, async (req, res) => {
  // Validate Order ID format
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ 
      message: "Invalid order ID format." 
    });
  }

  const { status } = req.body;
  const allowed = ["pending", "preparing", "ready", "completed"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const oldStatus = order.status;
    order.status = status;
    const updated = await order.save();

    // Send status update email if customer has email
    if (updated.customerEmail && oldStatus !== status) {
      try {
        await sendStatusUpdateEmail({ to: updated.customerEmail, order: updated, oldStatus });
      } catch (error) {
        console.error("Status update email failed", error);
      }
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Error updating order status." });
  }
});

router.get("/metrics/summary", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find();
    
    // Calculate metrics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // Group by status
    const byStatus = {
      pending: 0,
      preparing: 0,
      ready: 0,
      completed: 0
    };
    
    orders.forEach((order) => {
      byStatus[order.status]++;
    });

    // Find top items
    const itemCounts = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!itemCounts[item.name]) {
          itemCounts[item.name] = { count: 0, revenue: 0 };
        }
        itemCounts[item.name].count += item.quantity;
        itemCounts[item.name].revenue += item.price * item.quantity;
      });
    });

    const topItems = Object.entries(itemCounts)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate average order value
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    // Orders by date (last 7 days)
    const last7Days = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      last7Days[dateStr] = 0;
    }

    orders.forEach((order) => {
      const dateStr = order.createdAt.toISOString().split("T")[0];
      if (last7Days[dateStr] !== undefined) {
        last7Days[dateStr]++;
      }
    });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      avgOrderValue,
      byStatus,
      topItems,
      ordersByDate: last7Days,
      completionRate: totalOrders > 0 ? ((byStatus.completed / totalOrders) * 100).toFixed(1) : 0
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics" });
  }
});

export default router;
