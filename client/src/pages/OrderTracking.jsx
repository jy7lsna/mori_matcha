import React, { useState } from "react";
import api from "../api/client.js";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrder(response.data);
      setStatus("success");
    } catch (err) {
      // Show specific error messages
      if (err.response?.status === 400) {
        setError("Invalid order ID format. Please check the ID and try again.");
      } else if (err.response?.status === 404) {
        setError("Order not found. Please check your order ID.");
      } else {
        setError("Unable to find order. Please try again.");
      }
      setStatus("error");
      setOrder(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      preparing: "#3b82f6",
      ready: "#10b981",
      completed: "#10b981"
    };
    return colors[status] || "#666";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: "📋",
      preparing: "👨‍🍳",
      ready: "✅",
      completed: "🎉"
    };
    return icons[status] || "❓";
  };

  const statusSteps = ["pending", "preparing", "ready", "completed"];

  return (
    <section className="order-tracking">
      <div className="tracking-container">
        <div>
          <p className="section-label">Check Your Order</p>
          <h2 className="section-title">Track Your Order</h2>
        </div>
        <p className="tracking-subtitle">
          Enter your order ID to see the current status of your delicious matcha order.
        </p>

        <form className="tracking-form" onSubmit={handleTrack}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Paste your Order ID here..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="tracking-input"
            />
            <button type="submit" className="btn-primary tracking-submit">
              {status === "loading" ? "Tracking..." : "Track Order"}
            </button>
          </div>
          {error && <p className="tracking-error">❌ {error}</p>}
        </form>

        {order && status === "success" && (
          <div className="order-details-card">
            <div className="order-header">
              <div>
                <h3>Order Confirmation</h3>
                <p className="order-id">📦 Order ID: {order._id}</p>
                <p style={{ fontSize: "0.85rem", color: "#999", marginTop: "0.5rem" }}>
                  (Save this ID to track your order later)
                </p>
              </div>
              <div className="order-created">
                {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="status-timeline">
              <div className="timeline-label">📍 Order Status</div>
              <div className="timeline-steps">
                {statusSteps.map((step, idx) => (
                  <div
                    key={step}
                    className={`timeline-step ${order.status === step || statusSteps.indexOf(order.status) >= idx ? "active" : ""}`}
                  >
                    <div className="step-circle">
                      {statusSteps.indexOf(order.status) > idx ? "✓" : getStatusIcon(step)}
                    </div>
                    <div className="step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items-section">
              <h4>Order Items</h4>
              <div className="order-items-list">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-total">Rs {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="order-footer">
              <div className="order-total">
                <span>Total Amount:</span>
                <span className="total-price">Rs {order.totalPrice.toFixed(2)}</span>
              </div>

              {/* Customer Info */}
              {order.customerName && (
                <div className="customer-info">
                  <p>
                    <strong>Name:</strong> {order.customerName}
                  </p>
                </div>
              )}

              {order.notes && (
                <div className="order-notes">
                  <p>
                    <strong>Special Notes:</strong> {order.notes}
                  </p>
                </div>
              )}

              {/* Status Message */}
              <div className="status-message">
                {order.status === "pending" && (
                  <p>🕐 Your order has been received and will start preparing soon!</p>
                )}
                {order.status === "preparing" && (
                  <p>👨‍🍳 Your order is being prepared with care by our team!</p>
                )}
                {order.status === "ready" && (
                  <p>✅ Your order is ready! Come pick it up!</p>
                )}
                {order.status === "completed" && (
                  <p>🎉 Thanks for your order! We hope you enjoyed it!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {status === "idle" && !order && (
          <div className="tracking-help">
            <p>Enter your order ID above to track your order status in real-time!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderTracking;
