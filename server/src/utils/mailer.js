import nodemailer from "nodemailer";

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
};

export const sendReceiptEmail = async ({ to, order }) => {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM;

  if (!transporter || !from || !to) {
    return;
  }

  const lines = order.items
    .map((item) => `${item.name} x${item.quantity} - Rs ${item.price}`)
    .join("\n");

  const body = `Thanks for your order!\n\nOrder ID: ${order._id}\nStatus: ${order.status}\n\nItems:\n${lines}\n\nTotal: Rs ${order.totalPrice}`;

  await transporter.sendMail({
    from,
    to,
    subject: "Mori & Mochi Order Confirmation",
    text: body
  });
};

export const sendStatusUpdateEmail = async ({ to, order, oldStatus }) => {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM;

  if (!transporter || !from || !to) {
    return;
  }

  const statusMessages = {
    pending: "We've received your order and will start preparing it soon! ☕",
    preparing: "We're preparing your delicious matcha items right now! 🍵",
    ready: "Your order is ready for pickup! Come grab it! 🎉",
    completed: "Thank you for your order! We hope you enjoyed it! 💚"
  };

  const body = `Hi ${order.customerName || "there"}!\n\nYour order status has been updated!\n\n📦 Order ID: ${order._id}\n🔄 Status: ${order.status.toUpperCase()}\n\n${statusMessages[order.status]}\n\nItems:\n${order.items.map((item) => `• ${item.name} x${item.quantity}`).join("\n")}\n\nTotal: Rs ${order.totalPrice}`;

  await transporter.sendMail({
    from,
    to,
    subject: `Mori & Mochi - Order ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`,
    text: body
  });
};
