import React, { useContext, useMemo, useState } from "react";
import CartContext from "../context/CartContext.jsx";
import api from "../api/client.js";

const CartDrawer = () => {
  const { items, total, isOpen, setIsOpen, removeItem, setQuantity, clear } = useContext(CartContext);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const placeOrder = async () => {
    if (!items.length) {
      return;
    }

    setStatus("loading");
    setError("");

    const payload = {
      items: items.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice: total,
      customerName: customerName.trim() || "Guest",
      customerEmail,
      notes
    };

    try {
      const response = await api.post("/orders", payload);
      setStatus("success");
      setOrderId(response.data._id);
      setOrderStatus(response.data.status);
      clear();
      setCustomerName("");
      setCustomerEmail("");
      setNotes("");
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Order failed. Please try again.");
    }
  };

  const refreshStatus = async () => {
    if (!orderId) {
      return;
    }

    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrderStatus(response.data.status);
    } catch (err) {
      setError("Unable to refresh order status.");
    }
  };

  const resetOrder = () => {
    setStatus("idle");
    setOrderId("");
    setOrderStatus("");
    setError("");
    setIsOpen(false);
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert("Order ID copied to clipboard!");
  };

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Cart</h3>
        <button type="button" className="cart-close" onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </div>

      {/* Success Screen */}
      {status === "success" ? (
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p className="success-message">Thank you for your order. We've started preparing your drink.</p>

          <div className="order-id-box">
            <p className="order-id-label">📦 Your Order ID:</p>
            <div className="order-id-display" onClick={copyOrderId} style={{ cursor: "pointer" }}>
              <code>{orderId}</code>
              <button 
                type="button" 
                className="copy-btn" 
                onClick={(e) => { e.stopPropagation(); copyOrderId(); }}
                title="Copy to clipboard"
              >
                📋 Copy
              </button>
            </div>
            <p className="order-id-hint">Click to copy • Use this to track your order</p>
          </div>

          <div className="order-details">
            <div className="detail-row">
              <span className="detail-label">Items:</span>
              <span className="detail-value">{itemCount}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Total:</span>
              <span className="detail-value">Rs {total.toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`status-badge status-${orderStatus}`}>{orderStatus}</span>
            </div>
          </div>

          <button type="button" className="btn-primary" onClick={refreshStatus}>
            Refresh Status
          </button>
          <button type="button" className="btn-ghost" onClick={resetOrder}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty. Add items to get started!</p>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-content">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">Rs {item.price}</div>
                    </div>
                    <div className="cart-item-actions">
                      <button type="button" className="qty-btn" onClick={() => setQuantity(item._id, item.quantity - 1)}>
                        −
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button type="button" className="qty-btn" onClick={() => setQuantity(item._id, item.quantity + 1)}>
                        +
                      </button>
                      <button type="button" className="cart-remove" onClick={() => removeItem(item._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Form */}
              <form className="cart-form" onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>
                <fieldset disabled={status === "loading"}>
                  <label>
                    Name (optional)
                    <input
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Your name"
                      type="text"
                    />
                  </label>
                  <label>
                    Email (optional)
                    <input
                      value={customerEmail}
                      onChange={(event) => setCustomerEmail(event.target.value)}
                      placeholder="you@example.com"
                      type="email"
                    />
                  </label>
                  <label>
                    Special Notes (optional)
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      rows="2"
                      placeholder="Extra ice, no sugar, etc..."
                    />
                  </label>

                  {status === "error" && <p className="form-error">{error}</p>}

                  <button type="submit" className="btn-primary" disabled={status === "loading" || items.length === 0}>
                    {status === "loading" ? (
                      <>
                        <span className="spinner"></span> Placing Order...
                      </>
                    ) : (
                      `Place Order • Rs ${total.toFixed(2)}`
                    )}
                  </button>
                </fieldset>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartDrawer;
